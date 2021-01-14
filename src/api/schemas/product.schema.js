const yup = require('yup');

const createProduct = yup.object().shape({
  company_id: yup.string().uuid().required(),
  category_id: yup.string().uuid().required(),
  name: yup.string().required(),
  price: yup.number().required(),
  type: yup.string().required(),
});

module.exports = { createProduct };
