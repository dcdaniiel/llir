const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const Auth = require('./auth');

module.exports = (opts) => {
  const router = new Router();
  router.use(bodyParser());
  router.use('/auth', Auth(opts).routes());

  return [router.routes()];
};
