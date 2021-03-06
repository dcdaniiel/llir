const { emitter } = require('../../utils');
const { validateSchema } = require('../schemas');
const { AuthService } = require('../services');

module.exports = () => {
  const auth = AuthService();

  return {
    async create(ctx) {
      try {
        const { body } = ctx.request;

        await validateSchema('login', body);

        const { statusCode, data } = await auth.create(body);

        ctx.body = data;
        ctx.status = statusCode;
      } catch (e) {
        emitter.emit('ERROR::', e);
        ctx.body = { message: e.errors || e.detail };
        ctx.status = 400;
      }
    },
  };
};
