const Queue = require('bull');
const jobs = require('../jobs');

const redisConfig = {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  },
};

const queues = Object.values(jobs).map(({ key, handle }) => ({
  bull: new Queue(key, redisConfig),
  name: key,
  handle,
}));

module.exports = {
  queues,
  add(name, data) {
    const queue = this.queues.find((q) => q.name === name);
    if (!queue) {
      return 'Queue option not found';
    }
    return queue.bull.add(data);
  },
  process() {
    this.queues.forEach((queue) => {
      queue.bull.process(queue.handle);
      queue.bull.on('failed', (job, err) =>
        console.log('JOB>>', job.data, err)
      );
    });
  },
};
