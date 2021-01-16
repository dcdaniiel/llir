const { decrypt } = require('../helpers');
const { emitter } = require('../../utils');
const { User, Company, ClientsCompanies } = require('../../core/models');
const { sendEmail } = require('./email');
const Queue = require('./queue.service');

module.exports = () => ({
  async create(body) {
    const { name, cpf, email, phone, password, birthdate, cod } = body;

    const user = await new User(
      name,
      cpf,
      email,
      phone,
      password,
      birthdate,
      cod
    ).save();

    await Queue.add('SendMail', { template: 'email_confirmation', user });

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

      await Queue.add('SendMail', { template: 'email_confirmed', user });

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
  async link_company(id, cod) {
    if (!id) {
      return {
        data: { message: 'Missing user id!' },
        statusCode: 404,
      };
    }

    const user = await User.fetch(id);
    const [company] = await Company.findBy({ cod });

    if (user && company) {
      if (company._user_id === user.id) {
        return {
          data: { message: 'Not authorized!' },
          statusCode: 401,
        };
      }

      if (!user.email_confirmed) {
        return {
          statusCode: 401,
          data: {
            message: 'Please confirm you email before to continue!',
          },
        };
      }

      const [already_exists_link] = await ClientsCompanies.findBy({
        company_id: company.id,
        user_id: user.id,
      });

      if (already_exists_link) {
        return {
          statusCode: 400,
          data: { message: 'Link already exist!' },
        };
      }

      await Company.trx_client({ user_id: user.id, company_id: company._id });

      return {
        statusCode: 201,
        data: { message: 'Linked succesfully' },
      };
    }

    return {
      data: { message: 'User or Company not found' },
      statusCode: 404,
    };
  },
});
