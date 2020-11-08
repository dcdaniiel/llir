const {
  UserKnexPersist,
  CompanyKnexPersist,
  ImageKnexPersist,
  AddressKnexPersist,
  RoleKnexPersist,
  ClientsCompaniesKnexPersist,
  ProductKnexPersist,
  ProductImagesKnexPersist,
  PaymentKnexPersist,
  OrderKnexPersist,
  OrderDetailKnexPersist,
} = require('./knex');

const {
  UsersMemoryPersist,
  CompanyMemoryPersist,
  ImageMemoryPersist,
  AddressMemoryPersist,
  RoleMemoryPersist,
  ClientsCompaniesMemoryPersist,
  ProductMemoryPersist,
  ProductImagesMemoryPersist,
  PaymentMemoryPersist,
  OrderMemoryPersist,
  OrderDetailMemoryPersist,
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
          Address: [AddressKnexPersist, db],
          Role: [RoleKnexPersist, db],
          ClientsCompanies: [ClientsCompaniesKnexPersist, db],
          Product: [ProductKnexPersist, db],
          ProductImages: [ProductImagesKnexPersist, db],
          Payment: [PaymentKnexPersist, db],
          Order: [OrderKnexPersist, db],
          OrderDetail: [OrderDetailKnexPersist, db],
        };
        break;
      case 'memory':
        class_map = {
          User: [UsersMemoryPersist],
          Company: [CompanyMemoryPersist],
          Image: [ImageMemoryPersist],
          Address: [AddressMemoryPersist],
          Role: [RoleMemoryPersist],
          ClientsCompanies: [ClientsCompaniesMemoryPersist],
          Product: [ProductMemoryPersist],
          ProductImages: [ProductImagesMemoryPersist],
          Payment: [PaymentMemoryPersist],
          Order: [OrderMemoryPersist],
          OrderDetail: [OrderDetailMemoryPersist],
        };
        break;
      default:
        throw Error('Invalid persist mode');
    }
    return new PersistorSingleton(class_map);
  }
}

module.exports = { PersistorProvider };
