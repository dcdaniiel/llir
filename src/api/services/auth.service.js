const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, UserAuth } = require('../../core/models');
const { redis } = require('../helpers');

module.exports = () => ({
  async create({ email, password }) {
    const [user] = await User.findBy({ email });

    if (user) {
      const { _salt, _password } = user;
      const givePassword = _salt + password;

      const valid = await bcryptjs.compare(givePassword, _password);

      if (valid) {
        const claimsData = await UserAuth.getAuth(user._id);
        const payload = claimsData.reduce((acc, { company, role, claims }) => {
          // eslint-disable-next-line no-unused-vars
          const { id, user_id, created_at, updated_at, ...comp } = company;
          return {
            ...acc,
            user: {
              name: user._name,
              email: user._email,
              phone: user._phone,
              cpf: user._cpf,
              created_at: user._created_at,
            },
            companies: (acc.companies || []).concat({
              id: company.id,
              name: company.name,
              avatar_id: company.avatar_id,
            }),
            [company.id]: {
              claims,
              company: comp,
            },
          };
        }, {});

        const token = jwt.sign(
          { ...payload.user, companies: payload.companies },
          process.env.JWT_SECRET,
          {
            expiresIn: '6h',
          }
        );

        redis.set(user._id, JSON.stringify(payload));

        return {
          statusCode: 200,
          data: {
            message: 'Successfully login!',
            token,
          },
        };
      }

      return {
        statusCode: 400,
        data: { message: 'invalid password or user' },
      };
    }
    return {
      statusCode: 404,
      data: { message: 'user not fount!' },
    };
  },
});
