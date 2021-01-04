const knex = require('knex');
const { createClient } = require('redis');
const knexConfig = require('../../knexfile');

const env = process.env.NODE_ENV || 'development';

const db = knex(knexConfig[env]);

module.exports = { db };
