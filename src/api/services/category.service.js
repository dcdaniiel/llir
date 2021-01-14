const { categoryByCompany } = require('../helpers/sql');

const { Category } = require('../../core/models');
const { redis } = require('../helpers');

module.exports = () => ({
  async create({ name, cod, user }) {
    const data = await redis.get(user.id);

    const company = data?.companies.find((cp) => cp.cod === cod);

    if (!company) {
      return {
        data: { message: 'Company not found' },
        statusCode: 200,
      };
    }

    const [category] = await Category.findBy({ name, company_id: company.id });

    if (category) {
      return {
        data: { message: 'Category already exists!' },
        statusCode: 200,
      };
    }

    const { id } = await new Category(name, company.id).save();

    return {
      statusCode: 201,
      data: {
        message: 'Category created successfully!',
        category: { id, name },
      },
    };
  },
  async list(cod) {
    const { rows } = await Category.raw(categoryByCompany(cod));

    if (!rows.length) {
      return {
        data: { message: 'Categories not found!' },
        statusCode: 404,
      };
    }

    return {
      data: rows,
      statusCode: 200,
    };
  },
});
