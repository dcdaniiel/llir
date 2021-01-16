require('dotenv').config();

const Queue = require('./api/services/queue.service');

Queue.process();
