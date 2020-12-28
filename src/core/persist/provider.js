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

const { db } = require('../../db');

const { PersistorSingleton } = require('./persist');

class PersistorProvider {
  static getPersistor() {
    if (PersistorProvider.instance) {
      return PersistorProvider.instance;
    }

    return new PersistorSingleton({
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
    });
  }
}

module.exports = { PersistorProvider };
