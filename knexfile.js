const path = require('path');

const BASE_PATH = path.join(__dirname, 'src/db');

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.PG_HOST || '0.0.0.0',
      port: process.env.PG_PORT || '5432',
      database: process.env.PG_DATABASE || 'dot-collector',
      user: process.env.PG_USER || 'daniel',
      password: process.env.PG_PASSWD || 'sehl0k',
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },
  test: {
    client: 'postgresql',
    connection: {
      host: process.env.PG_HOST || '0.0.0.0',
      port: process.env.PG_PORT || '5432',
      database: process.env.PG_DATABASE || 'dot-collector',
      user: process.env.PG_USER || 'daniel',
      password: process.env.PG_PASSWD || 'sehl0k',
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },
};
