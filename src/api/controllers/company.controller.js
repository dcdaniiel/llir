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
        emitter.emit('ERROR::', e);
        ctx.body = e.errors || e.detail;
        ctx.status = 400;
      }
    },
    async list(ctx) {
      try {
        const { confirmation } = ctx.query;

        const { data, statusCode } = await company.validate_confirmation(
          confirmation
        );

        ctx.body = data;
        ctx.status = statusCode;
      } catch (e) {
        emitter.emit('ERROR::', e);
        ctx.body = e.errors || e.detail;
        ctx.status = 400;
      }
    },
    async invite_creation(ctx) {
      try {
        const { body } = ctx.request;

        await validateSchema('companyCreateInvite', body);

        const { data, statusCode } = await company.invite_creation(body);

        ctx.body = data;
        ctx.status = statusCode;
      } catch (e) {
        emitter.emit('ERROR::', e);
        ctx.body = { message: e.errors || e.detail };
        ctx.status = 400;
      }
    },
    async products(ctx) {
      try {
        const { cod } = ctx.params;

        const { data, statusCode } = await company.products(cod);

        ctx.body = data;
        ctx.status = statusCode;
      } catch (e) {
        emitter.emit('ERROR::', e);
        ctx.body = e.errors || e.detail;
        ctx.status = 400;
      }
    },
    async product(ctx) {
      try {
        const { cod } = ctx.params;
        const { body } = ctx.request;
        const { user } = ctx.state;

        await validateSchema('createProduct', body);

        const { data, statusCode } = await company.product(cod, body, user.id);

        ctx.body = data;
        ctx.status = statusCode;
      } catch (e) {
        emitter.emit('ERROR::', e);
        ctx.body = e.errors || e.detail;
        ctx.status = 400;
      }
    },
  };
};
