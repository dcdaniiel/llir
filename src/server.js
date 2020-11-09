require('dotenv').config();
const { startServer } = require('./api');

const server = startServer(process.env.PORT_HTTP);

module.exports = server;
