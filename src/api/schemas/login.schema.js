const yup = require('yup');

const login = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

module.exports = { login };
