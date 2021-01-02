const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const Auth = require('./auth');
const User = require('./user');
const Company = require('./company');

module.exports = (opts) => {
  const router = new Router({ prefix: '/api' });
  router.use(bodyParser());
  router.use('/auth', Auth(opts).routes());
  router.use('/users', User(opts).routes());
  router.use('/company', Company(opts).routes());

  return [router.routes()];
};
