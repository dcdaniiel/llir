const db = require('../db');

const settings = {};

if (process.env.test_persist_option === 'memory') {
  settings.persist_options = ['memory', undefined];
} else {
  settings.persist_options = ['knex', db];
}

module.exports = settings;
