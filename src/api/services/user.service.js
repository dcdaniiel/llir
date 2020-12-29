const { User } = require('../../core/models');

module.exports = () => ({
  async create(body) {
    return {
      name: 'MOCK NAME',
      email: 'mock@mk.com',
      message: 'send obj created',
    };
  },
});
