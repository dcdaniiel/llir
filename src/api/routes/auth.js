const Router = require('koa-router');
const { AuthController } = require('../controllers');

module.exports = (opts) => {
  const auth = AuthController();
  const router = new Router();
  router.post('/', auth.create);

  return router;
};
