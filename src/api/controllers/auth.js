const { emitter } = require('../../utils');

module.exports = {
  get: async (ctx, next) => {
    try {
      const User = ctx.state.persistor.getPersistInstance('User');
      const users = (await User.getAll()).map((user) => {
        // eslint-disable-next-line no-unused-vars
        const { _password, ...userData } = User._class.deserialize(user);
        return userData;
      });

      ctx.status = 200;
      ctx.body = users;
      emitter.emit(`User getAll: ${JSON.stringify(users)}`);
    } catch (e) {
      ctx.body = {
        message: `${e}`,
      };
      ctx.status = 500;

      emitter.emit(`User getAll: ${e}`);
    }
  },
};
