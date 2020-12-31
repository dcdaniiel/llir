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
        emitter.emit(`Error ${e}`);
        ctx.body = e.errors || e.detail;
        ctx.status = 400;
      }
    },
  };
};
