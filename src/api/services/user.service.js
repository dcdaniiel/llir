const { User } = require('../../core/models');

module.exports = () => ({
  async create(body) {
    const { name, cpf, email, phone, password, birthdate } = body;

    const user = await new User(
      name,
      cpf,
      email,
      phone,
      password,
      birthdate
    ).save();

    return {
      statusCode: 201,
      data: { name: user.name, email: user.email, phone: user.phone },
    };
  },
});
