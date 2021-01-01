const { User } = require('./user');
const { Company } = require('./company');
const { Image } = require('./image');
const { Address } = require('./address');
const { Role, RoleTypes } = require('./role');
const { ClientsCompanies } = require('./clients_companies');
const { Product } = require('./products');
const { ProductImages } = require('./product_images');
const { Payment } = require('./payment');
const { Order } = require('./order');
const { OrderDetail } = require('./order_detail');
const { Category } = require('./category');
const { AuthClaims } = require('./auth_claims');
const { UserAuth } = require('./user_auth');

module.exports = {
  User,
  AuthClaims,
  UserAuth,
  Category,
  Company,
  Image,
  Address,
  Role,
  RoleTypes,
  ClientsCompanies,
  Product,
  ProductImages,
  Payment,
  Order,
  OrderDetail,
};
