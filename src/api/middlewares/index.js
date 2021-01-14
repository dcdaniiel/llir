const jwt = require('koa-jwt');
const jwksRsa = require('jwks-rsa');
const { upload } = require('./upload.middleware');

const setApp = (app) => {
  return async (ctx, next) => {
    ctx.state.app = app;
    return next();
  };
};

const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET });

module.exports = {
  setApp,
  jwtMiddleware,
  upload,
};
