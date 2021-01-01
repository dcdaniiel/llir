const Router = require('koa-router');
const { AuthController } = require('../controllers');

module.exports = (opts) => {
  const auth = AuthController();
  const router = new Router();
  router.post('/login', auth.create);

  return router;
};
