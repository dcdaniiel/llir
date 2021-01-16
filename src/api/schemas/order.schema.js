const yup = require('yup');

const orderCreate = yup.object().shape({
  payment_id: yup.string().uuid().required(),
  delivery_day: yup.date().required(),
  description: yup.string().required(),
  items: yup
    .array()
    .of(
      yup.object().shape({
        quantity: yup.number().required().min(1).max(100),
        id: yup.string().uuid().required(),
      })
    )
    .max(100)
    .required(),
});

module.exports = { orderCreate };
