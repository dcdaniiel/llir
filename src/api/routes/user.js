const Router = require('koa-router');
const { UserController } = require('../controllers');

module.exports = (opts) => {
  const user = UserController();
  const router = new Router();
  router.post('/', user.create);
  router.get('/email', user.confirmation_email);
  router.post('/:id/link', user.link_company);

  return router;
};
