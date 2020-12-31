const { emitter } = require('../../utils');
const { UserService } = require('../services');

module.exports = () => {
  const user = UserService();

  return {
    async create(ctx) {
      try {
        const { body } = ctx.request;

        console.log('BODY:::', body);
        ctx.body = await user.create(body);
        ctx.status = 201;
      } catch (e) {
        console.log('ERROR::', e);
        ctx.body = e.errors || e.detail;
        ctx.status = 400;
      }
    },
  };
};
