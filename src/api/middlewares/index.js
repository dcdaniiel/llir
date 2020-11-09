const jwt = require('koa-jwt');
const jwksRsa = require('jwks-rsa');

const setApp = (app) => {
  return async (ctx, next) => {
    ctx.state.app = app;
    return next();
  };
};

const jwtMiddleware = jwt({ secret: jwksRsa.koaJwtSecret() });

module.exports = {
  setApp,
};
