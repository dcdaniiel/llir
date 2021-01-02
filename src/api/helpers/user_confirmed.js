const { User } = require('../../core/models');

const confirm_email = async (id) => {
  const { email_confirmed } = await User.fetch(id);
  return email_confirmed;
};

module.exports = { confirm_email };
