const yup = require('yup');

const addressCreate = yup.object().shape({
  user_id: yup.string().uuid(),
  company_id: yup.string().uuid(),
  street: yup.string().required(),
  number: yup.number().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  country: yup.string().required(),
  district: yup.string().required(),
  description: yup.string().required(),
  zipcode: yup.string().required(),
});

module.exports = { addressCreate };
