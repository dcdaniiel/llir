const { promisify } = require('util');
const { createClient } = require('redis');
const { emitter } = require('../../utils');

const client = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

client.on('connect', () => emitter.emit('Redis connected successfully'));
client.on('error', (e) => emitter.emit(`Redis error ${e}`));
client.on('ready', () => emitter.emit('Redis ready'));

module.exports = {
  set(key, value) {
    client.set(key, value);
  },
  async get(key) {
    const get = promisify(client.get).bind(client);
    return get(key);
  },
  async sadd(key, list) {
    return client.sadd(key, list);
  },
};
