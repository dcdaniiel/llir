const { emitter } = require('../../utils');
const { OrderService } = require('../services');
const { validateSchema } = require('../schemas');

module.exports = () => {
  const order = OrderService();
  return {
    async create(ctx) {
      try {
        const { body } = ctx.request;
        const { cod } = ctx.params;
        const { user } = ctx.state;

        await validateSchema('orderCreate', body);

        const { statusCode, data } = await order.create({ body, cod, user });

        ctx.body = data;
        ctx.status = statusCode;
      } catch (e) {
        emitter.emit(`Error > ${e}`);
        ctx.body = { message: e.errors || e.detail || e };
        ctx.status = 400;
      }
    },
    async list(ctx) {
      try {
        const { cod } = ctx.params;
        const { user } = ctx.state;

        const { statusCode, data } = await order.list({ cod, user });

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
