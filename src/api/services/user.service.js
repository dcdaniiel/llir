const { emitter } = require('../../utils');
const { User } = require('../../core/models');
const { sendEmail } = require('./email/email.service');

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

    sendEmail(email, 'LLIR - Confirmação de email', 'teste').then((msg) =>
      emitter.emit(`Email: ${JSON.stringify(msg)}`)
    );

    return {
      statusCode: 201,
      data: { message: 'User created successfully', user_id: user.id },
    };
  },
});
