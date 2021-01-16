const Router = require('koa-router');
const {
  CompanyController,
  CategoryController,
  OrdersController,
} = require('../controllers');

module.exports = (opts) => {
  const company = CompanyController();
  const category = CategoryController();
  const orders = OrdersController();
  const router = new Router();

  router.post('/', company.create);
  router.post('/confirmation', company.invite_creation);
  router.get('/', company.list);
  router.get('/:cod', company.products);

  opts.middlewares.forEach((middleware) => router.use(middleware));

  router.get('/:cod/categories', category.list);
  router.post('/:cod/categories', category.create);
  router.post('/:cod/orders', orders.create);
  router.post('/:cod', company.product);

  return router;
};
