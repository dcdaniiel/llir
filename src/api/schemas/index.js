const { userCreate } = require('./user.schema');
const { login } = require('./login.schema');
const {
  companyCreate,
  companyCreateInvite,
  linkCompany,
} = require('./company.schema');
const { addressCreate } = require('./address.schema');
const { createProduct } = require('./product.schema');
const { categoryCreate } = require('./category.schema');

const schemas = {
  userCreate,
  categoryCreate,
  addressCreate,
  login,
  companyCreate,
  companyCreateInvite,
  linkCompany,
  createProduct,
};

const validateSchema = (schema, obj) => schemas[schema].validate(obj);

module.exports = { validateSchema };
