const { db } = require('../../db');

module.exports = {
  persist_options:
    process.env.test_persist_option === 'memory' ? ['memory'] : ['knex', db],
};
