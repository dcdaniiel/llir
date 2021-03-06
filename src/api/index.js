const Koa = require('koa');
const cors = require('koa2-cors');
const logger = require('koa-logger');
const route = require('./routes');
const { startLogger, emitter, mqttClient } = require('../utils');
const { PersistorProvider } = require('../core/persist');
const { jwtMiddleware } = require('./middlewares');

const corsOptions = {
  origin: '*',
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
};

const startServer = async (port) => {
  const app = new Koa();

  await mqttClient.connect();

  startLogger(emitter);
  app.use(logger());
  app.use(cors(corsOptions));

  const routes = route({
    middlewares: [jwtMiddleware],
    corsOptions,
  });

  app.on('error', (err, ctx) => {
    emitter.emit('Error: ', `${err}: ${ctx}`);
  });

  app.use(async (ctx, next) => {
    try {
      ctx.state.persistor = PersistorProvider.getPersistor();

      await next();
    } catch (error) {
      emitter.emit(`error handler: ${error}`);
      ctx.status = 500;
      ctx.body = error;

      if (error && error.status) {
        ctx.status = error.status;
      }
    }
  });

  for (const r of routes) {
    app.use(r);
  }

  return app.listen(port, () => {
    emitter.emit(`Server running on port: ${port}`);
  });
};

module.exports = { startServer };
