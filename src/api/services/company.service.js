const { isWithinInterval, sub } = require('date-fns');
const { emitter } = require('../../utils');
const { Company, User } = require('../../core/models');
const { confirm_email, decrypt } = require('../helpers');
const { sendEmail } = require('./email/email.service');

module.exports = () => {
  const generate_cod = async (name) => {
    const cod = Company.cod_generator(name);

    const [existCod, ...rest] = await Company.findBy({ cod });

    if (existCod) {
      return generate_cod(name);
    }

    return cod;
  };

  return {
    async create(obj) {
      const [iv, key, encryptedData] = obj.token.split('.');

      if (!iv || !key || !encryptedData) {
        return {
          data: { message: 'invalid token' },
          statusCode: 400,
        };
      }

      const data = decrypt({
        iv: Buffer.from(iv, 'hex'),
        key: Buffer.from(key, 'hex'),
        encryptedData,
      });

      const [companyExists] = await Company.findBy({ name: obj.name });

      if (companyExists) {
        return {
          statusCode: 400,
          data: { message: 'Company already registered!' },
        };
      }

      const [user_id, _] = data.split('_');

      const company = new Company(
        obj.name,
        obj.phone,
        obj.available_days,
        user_id,
        obj.avatar_id
      );

      const confirmed = await confirm_email(user_id);

      if (!confirmed.enabled) {
        return {
          statusCode: confirmed?.status || 401,
          data: { message: confirmed?.message || 'User need confirm email' },
        };
      }

      company.cod = await generate_cod(obj.name);

      await company.save();

      return {
        statusCode: 201,
        data: { message: 'Company created successfully!' },
      };
    },

    async invite_creation(email) {
      const [user] = await User.findBy(email);

      if (user) {
        const companies = await Company.findBy({ user_id: user.id });

        if (companies?.length === 3) {
          return {
            data: { message: 'Limit companies exceed!' },
            statusCode: 400,
          };
        }

        sendEmail('email_confirmation_company', user).then((msg) =>
          emitter.emit(`Email: ${JSON.stringify(msg)}`)
        );

        return {
          data: { message: `Invite sended to ${user.email}` },
          statusCode: 200,
        };
      }

      return {
        data: { message: 'User not found!' },
        statusCode: 404,
      };
    },

    async validate_confirmation(confirmation) {
      const [iv, key, encryptedData] = confirmation.split('.');

      const decrypted = decrypt({
        iv: Buffer.from(iv, 'hex'),
        key: Buffer.from(key, 'hex'),
        encryptedData,
      });

      const [user_id, date] = decrypted.split('_');

      const today = new Date();

      const valid = isWithinInterval(new Date(date), {
        start: sub(today, {
          hours: 8,
        }),
        end: today,
      });

      if (valid) {
        const user = await User.fetch(user_id);

        if (!user.email_confirmed) {
          return {
            data: {
              message: 'Please before to continue, confirm your account!',
            },
            statusCode: 401,
          };
        }

        if (user) {
          return {
            statusCode: 200,
            data: { message: 'OK' },
          };
        }

        return {
          statusCode: 404,
          data: { message: 'Token expired!' },
        };
      }

      return {
        data: { message: 'Token expired! ' },
        statusCode: 400,
      };
    },
  };
};
