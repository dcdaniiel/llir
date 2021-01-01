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
        console.log('ERROR::', e);
        ctx.body = e.errors || e.detail;
        ctx.status = 400;
      }
    },
  };
};
