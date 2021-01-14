const Router = require('koa-router');
const { CompanyController, CategoryController } = require('../controllers');

module.exports = (opts) => {
  const company = CompanyController();
  const category = CategoryController();
  const router = new Router();

  router.post('/', company.create);
  router.post('/confirmation', company.invite_creation);
  router.get('/', company.list);
  router.get('/:cod', company.products);

  opts.middlewares.forEach((middleware) => router.use(middleware));

  router.get('/:cod/category', category.list);
  router.post('/:cod/category', category.create);
  router.post('/:cod', company.product);

  return router;
};
