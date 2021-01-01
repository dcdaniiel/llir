const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const Auth = require('./auth');
const User = require('./user');

module.exports = (opts) => {
  const router = new Router({ prefix: '/api' });
  router.use(bodyParser());
  router.use('/auth', Auth(opts).routes());
  router.use('/users', User(opts).routes());

  return [router.routes()];
};
