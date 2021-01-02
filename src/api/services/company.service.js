const { Company } = require('../../core/models');

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
      const company = new Company(
        obj.name,
        obj.phone,
        obj.available_days,
        obj.user_id,
        obj.avatar_id
      );

      const cod = await generate_cod(obj.name);

      company.cod = cod;

      await company.save();

      return {
        statusCode: 201,
        data: { message: 'Company created successfully!' },
      };
    },
  };
};
