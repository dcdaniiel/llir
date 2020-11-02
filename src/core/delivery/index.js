const { User } = require('./user');
const { Company } = require('./company');
const { Image } = require('./image');
const { Address } = require('./address');
const { Role, RoleTypes } = require('./role');
const { ClientsCompanies } = require('./clients_companies');
const { Product } = require('./products');
const { ProductImages } = require('./product_images');
const { Payment } = require('./payment');

module.exports = {
  User,
  Company,
  Image,
  Address,
  Role,
  RoleTypes,
  ClientsCompanies,
  Product,
  ProductImages,
  Payment,
};
