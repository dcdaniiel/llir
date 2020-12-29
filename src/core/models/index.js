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

module.exports = {
  User,
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
