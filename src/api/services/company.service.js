const { Company } = require('../../core/models');
const { confirm_email } = require('../helpers');

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
      const [companyExists] = await Company.findBy({ name: obj.name });

      if (companyExists) {
        return {
          statusCode: 400,
          data: { message: 'Company already registered!' },
        };
      }

      const company = new Company(
        obj.name,
        obj.phone,
        obj.available_days,
        obj.user_id,
        obj.avatar_id
      );

      const confirmed = await confirm_email(obj.user_id);

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
  };
};
