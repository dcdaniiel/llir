const {
  email_confirmation,
  email_confirmation_company,
} = require('./email_confirmation');
const { email_confirmed } = require('./email_confirmed');

const templates = {
  email_confirmation_company,
  email_confirmation,
  email_confirmed,
};

module.exports = templates;
