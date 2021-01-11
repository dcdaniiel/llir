const Router = require('koa-router');
const { UploadController } = require('../controllers');
const { upload } = require('../middlewares');

module.exports = (opts) => {
  const uploadCtl = UploadController();
  const router = new Router();

  router.post('/single', upload.single('single'), uploadCtl.create);

  return router;
};
