const { confirm_email } = require('./user_confirmed');
const { workerPool } = require('../services/email/workerSendMail');

module.exports = { confirm_email, workerPool };
