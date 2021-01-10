const Router = require('koa-router');
const { AddressController } = require('../controllers');

module.exports = (opts) => {
  const address = AddressController();
  const router = new Router();

  router.post('/', address.create);

  return router;
};
