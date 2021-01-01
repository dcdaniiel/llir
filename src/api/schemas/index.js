const { userCreate } = require('./user.schema');
const { login } = require('./login.schema');

const schemas = {
  userCreate,
  login,
};

const validateSchema = (schema, obj) => schemas[schema].validate(obj);

module.exports = { validateSchema };
