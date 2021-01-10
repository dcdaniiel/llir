const { Address } = require('../../core/models');

module.exports = () => ({
  async create(obj) {
    const {
      user_id,
      company_id,
      zipcode,
      street,
      number,
      city,
      state,
      country,
      district,
      description,
    } = obj;

    if (!user_id && !company_id) {
      return {
        data: { message: 'Missing author!' },
        statusCode: 404,
      };
    }

    const [exists] = await Address.findBy(obj);

    if (exists) {
      return {
        data: { message: 'address already registered!' },
        statusCode: 409,
      };
    }

    await new Address(
      street,
      number,
      city,
      state,
      country,
      zipcode,
      district,
      description,
      user_id
    ).save();

    return {
      data: { message: 'Address created successfully!' },
      statusCode: 201,
    };
  },
});
