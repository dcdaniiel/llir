const { userCreate } = require('./user.schema');
const { login } = require('./login.schema');
const {
  companyCreate,
  companyCreateInvite,
  linkCompany,
} = require('./company.schema');
const { addressCreate } = require('./address.schema');

const schemas = {
  userCreate,
  addressCreate,
  login,
  companyCreate,
  companyCreateInvite,
  linkCompany,
};

const validateSchema = (schema, obj) => schemas[schema].validate(obj);

module.exports = { validateSchema };
