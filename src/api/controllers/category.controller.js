const { emitter } = require('../../utils');
const { CategoryService } = require('../services');
const { validateSchema } = require('../schemas');

module.exports = () => {
  const category = CategoryService();
  return {
    async create(ctx) {
      try {
        const { body } = ctx.request;
        const { cod } = ctx.params;
        const { user } = ctx.state;

        await validateSchema('categoryCreate', body);

        const { statusCode, data } = await category.create({
          ...body,
          cod,
          user,
        });

        ctx.body = data;
        ctx.status = statusCode;
      } catch (e) {
        const message = `${e}`;
        emitter.emit(`Error > ${e}`);
        ctx.body = e.errors || e.detail || { message };
        ctx.status = 400;
      }
    },
    async list(ctx) {
      try {
        const { cod } = ctx.params;

        const { statusCode, data } = await category.list(cod);

        ctx.body = data;
        ctx.status = statusCode;
      } catch (e) {
        const message = `${e}`;
        emitter.emit(`Error > ${e}`);
        ctx.body = e.errors || e.detail || { message };
        ctx.status = 400;
      }
    },
  };
};
