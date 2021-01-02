const { isMainThread, parentPort, workerData } = require('worker_threads');
const Pool = require('worker-threads-pool');
const CPUS = require('os').cpus().length;
const { emitter } = require('../../../utils');
const { sendEmail } = require('./email.service');

const pool = new Pool({ max: CPUS });

const sendMail = (workerData) => {
  return new Promise((resolve, reject) => {
    pool.acquire(__filename, { workerData }, (err, worker) => {
      emitter.emit(`stated worker ${worker} - pool size ${pool.size}`);
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  });
};

if (!isMainThread) {
  const { to, subject, text } = workerData;
  sendEmail(to, subject, text, parentPort.postMessage);
}

module.exports = { sendMail };
