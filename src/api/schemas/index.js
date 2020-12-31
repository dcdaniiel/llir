const { userCreate } = require('./user.schema');

const schemas = {
  userCreate,
};

const validateSchema = (schema, obj) => schemas[schema].validate(obj);

module.exports = { validateSchema };
