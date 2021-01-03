const {
  UserKnexPersist,
  CategoryKnexPersist,
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
  AuthClaimsKnexPersist,
  UserAuthKnexPersist,
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
      Category: [CategoryKnexPersist, db],
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
      AuthClaims: [AuthClaimsKnexPersist, db],
      UserAuth: [UserAuthKnexPersist, db],
    });
  }
}

module.exports = { PersistorProvider };
