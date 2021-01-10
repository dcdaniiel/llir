const { emitter } = require('../../utils');
const { validateSchema } = require('../schemas');
const { UploadService } = require('../services');

module.exports = () => {
  const upload = UploadService();

  return {
    async create(ctx) {
      try {
        const { statusCode, data } = await upload.create(ctx.file);

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
