const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const auth = require('./auth');

module.exports = (opts) => {
  const router = new Router();
  router.use(bodyParser());
  auth(router, opts);

  return [router.routes()];
};
