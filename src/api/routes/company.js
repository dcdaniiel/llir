const Router = require('koa-router');
const { CompanyController } = require('../controllers');

module.exports = (opts) => {
  const company = CompanyController();
  const router = new Router();

  router.post('/', company.create);
  router.post('/confirmation', company.invite_creation);
  router.get('/', company.list);

  return router;
};
