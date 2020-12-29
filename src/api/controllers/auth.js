const { emitter } = require('../../utils');
const { UserService } = require('../services');

module.exports = () => {
  const user = UserService();

  return {
    async create(ctx) {
      try {
        const { body } = ctx.body;

        ctx.boxy = await user.create(body);
      } catch (e) {
        ctx.body = e.errors || e.detail;
        ctx.status = 400;
      }
    },
  };
};
