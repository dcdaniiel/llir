const { PersistorSingleton } = require('./persist');

class PersistorProvider {
  static getPersistor(persist_mode, ...args) {
    if (PersistorProvider.instance) {
      return PersistorProvider.instance;
    }
    let class_map;

    switch (persist_mode) {
      case 'knex':
        // eslint-disable-next-line no-case-declarations
        const db = args[0];
        class_map = {};
        break;
      case 'memory':
        class_map = {};
        break;
      default:
        throw Error('Invalid persist mode');
    }
    return new PersistorSingleton(class_map);
  }
}

module.exports = { PersistorProvider };
