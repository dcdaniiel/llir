const { emitter } = require('../../utils');
const { validateSchema } = require('../schemas');
const { CompanyService } = require('../services');

module.exports = () => {
  const company = CompanyService();

  return {
    async create(ctx) {
      try {
        const { body } = ctx.request;

        await validateSchema('companyCreate', body);

        const { statusCode, data } = await company.create(body);

        ctx.body = data;
        ctx.status = statusCode;
      } catch (e) {
        console.log('ERROR::', e);
        ctx.body = e.errors || e.detail;
        ctx.status = 400;
      }
    },
  };
};
