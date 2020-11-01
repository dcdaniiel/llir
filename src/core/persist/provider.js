const {
  UserKnexPersist,
  CompanyKnexPersist,
  ImageKnexPersist,
} = require('./knex');

const {
  UsersMemoryPersist,
  CompanyMemoryPersist,
  ImageMemoryPersist,
} = require('./memory');

const { PersistorSingleton } = require('./persist');

class PersistorProvider {
  static getPersistor(persist_mode, ...args) {
    if (PersistorProvider.instance) {
      return PersistorProvider.instance;
    }
    let class_map;

    switch (persist_mode) {
      case 'knex':
        const db = args[0];
        class_map = {
          User: [UserKnexPersist, db],
          Company: [CompanyKnexPersist, db],
          Image: [ImageKnexPersist, db],
        };
        break;
      case 'memory':
        class_map = {
          User: [UsersMemoryPersist],
          Company: [CompanyMemoryPersist],
          Image: [ImageMemoryPersist],
        };
        break;
      default:
        throw Error('Invalid persist mode');
    }
    return new PersistorSingleton(class_map);
  }
}

module.exports = { PersistorProvider };
