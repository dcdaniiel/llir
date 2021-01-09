const { emitter } = require('../../utils');
const { UserService } = require('../services');
const { validateSchema } = require('../schemas');

module.exports = () => {
  const user = UserService();
  return {
    async create(ctx) {
      try {
        const { body } = ctx.request;

        await validateSchema('userCreate', body);

        const { statusCode, data } = await user.create(body);

        ctx.body = data;
        ctx.status = statusCode;
      } catch (e) {
        const message = `${e}`;
        emitter.emit(`Error > ${e}`);
        ctx.body = e.errors || e.detail || { message };
        ctx.status = 400;
      }
    },
    async confirmation_email(ctx) {
      try {
        const { confirmation } = ctx.query;

        const { statusCode, data } = await user.confirmation_email(
          confirmation
        );

        ctx.body = data;
        ctx.status = statusCode;
      } catch (e) {
        emitter.emit(`Error ${e}`);
        ctx.body = e.errors || e.detail;
        ctx.status = 400;
      }
    },
    async link_company(ctx) {
      try {
        const { id } = ctx.params;
        const { body } = ctx.request;

        await validateSchema('linkCompany', body);

        const { statusCode, data } = await user.link_company(id, body.code);

        ctx.body = data;
        ctx.status = statusCode;
      } catch (e) {
        emitter.emit(`Error ${e}`);
        ctx.body = e.errors || e.detail;
        ctx.status = 400;
      }
    },
  };
};
