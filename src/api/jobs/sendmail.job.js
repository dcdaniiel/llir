const { sendEmail } = require('../services/email');

module.exports = {
  key: 'SendMail',
  handle({ data }) {
    const { template, user } = data;
    sendEmail(template, user);
  },
};
