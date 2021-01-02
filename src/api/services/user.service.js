const { decrypt, encrypt } = require('../helpers');
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

    sendEmail('email_confirmation', user).then((msg) =>
      emitter.emit(`Email: ${JSON.stringify(msg)}`)
    );

    return {
      statusCode: 201,
      data: { message: 'User created successfully', user_id: user.id },
    };
  },
  async confirmation_email(confirmation) {
    if (!confirmation) {
      return {
        statusCode: 403,
        data: 'Invalid token!',
      };
    }

    const [iv, key, encryptedData] = confirmation.split('.');

    const decrypted = decrypt({
      iv: Buffer.from(iv, 'hex'),
      key: Buffer.from(key, 'hex'),
      encryptedData,
    });

    if (decrypted) {
      const user = await User.fetch(decrypted);

      if (user.email_confirmed) {
        return {
          statusCode: 403,
          data: { message: 'Email already confirmed!' },
        };
      }

      user.email_confirmed = true;
      await user.save();

      sendEmail('email_confirmed', user);

      return {
        statusCode: 200,
        data: { message: 'Email successfully confirmed!' },
      };
    }

    return {
      statusCode: 400,
      data: { message: 'Invalid token' },
    };
  },
});
