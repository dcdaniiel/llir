const { User } = require('./user');
const { Company } = require('./company');
const { Image } = require('./image');
const { Address } = require('./address');
const { Role, RoleTypes } = require('./role');
const { ClientsCompanies } = require('./clients_companies');

module.exports = {
  User,
  Company,
  Image,
  Address,
  Role,
  RoleTypes,
  ClientsCompanies,
};
