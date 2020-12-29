const Koa = require('koa');
const cors = require('koa2-cors');
const logger = require('koa-logger');
const route = require('./routes');
const { startLogger, emitter } = require('../utils');
const { PersistorProvider } = require('../core/persist');

const corsOptions = {
  origin: '*',
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
};

const startServer = async (port) => {
  const app = new Koa();
  startLogger(emitter);

  const routes = route(app, {
    middlewares: [],
    corsOptions,
  });

  app.on('error', (err, ctx) => {
    emitter.emit('Error: ', `${err}: ${ctx}`);
  });

  app.use(async (ctx, next) => {
    try {
      ctx.state.persistor = PersistorProvider.getPersistor();
      await next();
    } catch (e) {
      emitter.emit(`error handler: ${e}`);
      ctx.status = 500;
      if (error && error.status) {
        ctx.status = error.status;
      }
    }
  });
  app.use(logger());
  app.use(cors(corsOptions));

  for (const r of routes) {
    app.use(r);
  }

  return app.listen(port, () => {
    emitter.emit(`Server running on port: ${port}`);
  });
};

module.exports = { startServer };
