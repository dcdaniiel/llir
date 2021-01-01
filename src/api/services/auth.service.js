const bcryptjs = require('bcryptjs');
const { User } = require('../../core/models');

module.exports = () => ({
  async create({ email, password }) {
    const [user] = await User.findBy({ email });

    if (user) {
      const { _salt, _password } = user;
      const givePassword = _salt + password;

      const valid = await bcryptjs.compare(givePassword, _password);

      if (valid) {
        return {
          statusCode: 200,
          data: {
            message: 'logged sucessfully',
            token: '',
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
