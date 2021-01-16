const { isWithinInterval, sub } = require('date-fns');
const { Company, User, Product, Category } = require('../../core/models');
const { confirm_email, decrypt, redis } = require('../helpers');
const Queue = require('./queue.service');

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

        await Queue.add('SendMail', {
          template: 'email_confirmation_company',
          user,
        });

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

    async products(cod) {
      if (!cod) {
        return {
          statusCode: 400,
          data: { message: 'Invalid Cod' },
        };
      }

      const [company] = await Company.findBy({ cod });

      if (!company) {
        return {
          statusCode: 404,
          data: { message: 'Invalid cod' },
        };
      }

      const company_id = company.id;
      const cached = await redis.get(`products:${company_id}`, 2);

      if (cached) {
        return {
          statusCode: 200,
          data: { message: 'list products', products: cached },
        };
      }

      const products = await Product.findBy({ company_id });

      const products_deserialized = await Promise.all(
        products.map(async ({ _category_id, _company_id, ...rest }) => {
          const { _name } = await Category.fetch(_category_id);
          return { ...rest, _category: _name };
        })
      );

      if (!products_deserialized.length) {
        return {
          statusCode: 204,
          data: {
            message: 'Without products registered!',
            products: products_deserialized,
          },
        };
      }

      await redis.set(
        `products:${company_id}`,
        JSON.stringify(products_deserialized)
      );

      return {
        statusCode: 200,
        data: { message: 'Products', products: products_deserialized },
      };
    },
    async product(cod, product, user_id) {
      if (!cod || !product) {
        return {
          statusCode: 400,
          data: { message: 'Missing data' },
        };
      }

      const { company_id, category_id, price, type } = product;

      const name = product.name.trim().toLowerCase();

      const data = await redis.get(`session:${user_id}`);

      if (!data) {
        return {
          statusCode: 401,
          data: { message: 'Unauthorized' },
        };
      }

      const company = data[company_id];

      if (!company) {
        return {
          data: { message: 'Invalid company' },
          statusCode: 400,
        };
      }

      const permission =
        company.role === 'admin' ||
        company.claims.includes('may_manager_product');

      if (!permission) {
        return {
          data: { message: 'Unauthorized' },
          statusCode: 401,
        };
      }

      const [exists_product] = await Product.findBy({ company_id, name });

      if (exists_product) {
        return {
          data: { message: 'Already exists this product registered!' },
          statusCode: 409,
        };
      }

      await new Product(company_id, name, price, type, category_id).save();

      redis.expireAt(company_id, 60);

      return {
        statusCode: 201,
        data: { message: 'Product create successfully' },
      };
    },
  };
};
