const Router = require('koa-router');
const { UserController } = require('../controllers');

module.exports = (opts) => {
  const user = UserController();
  const router = new Router();
  router.post('/', user.create);

  return router;
};
