const { emitter } = require('../../utils');
const { validateSchema } = require('../schemas');
const { AddressService } = require('../services');

module.exports = () => {
  const address = AddressService();

  return {
    async create(ctx) {
      try {
        const { body } = ctx.request;

        await validateSchema('addressCreate', body);

        const { statusCode, data } = await address.create(body);

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
