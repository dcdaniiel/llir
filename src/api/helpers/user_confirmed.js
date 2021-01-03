const { User } = require('../../core/models');

const confirm_email = async (id) => {
  const user = await User.fetch(id);
  if (user) {
    return {
      enabled: user.email_confirmed,
    };
  }

  return {
    enabled: !!user?.email_confirmed,
    status: 404,
    message: 'User not found!',
  };
};

module.exports = { confirm_email };
