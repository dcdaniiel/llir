const { userCreate } = require('./user.schema');
const { login } = require('./login.schema');
const { companyCreate, companyCreateInvite } = require('./company.schema');

const schemas = {
  userCreate,
  login,
  companyCreate,
  companyCreateInvite,
};

const validateSchema = (schema, obj) => schemas[schema].validate(obj);

module.exports = { validateSchema };
