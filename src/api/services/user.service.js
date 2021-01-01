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
      data: { message: 'User created successfully', user_id: user.id },
    };
  },
});
