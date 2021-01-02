const { email_confirmation } = require('./email_confirmation');
const { email_confirmed } = require('./email_confirmed');

const templates = {
  email_confirmation,
  email_confirmed,
};

module.exports = templates;
