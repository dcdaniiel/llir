const { userCreate } = require('./user.schema');
const { login } = require('./login.schema');
const { companyCreate } = require('./company.schema');

const schemas = {
  userCreate,
  login,
  companyCreate,
};

const validateSchema = (schema, obj) => schemas[schema].validate(obj);

module.exports = { validateSchema };
