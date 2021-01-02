const yup = require('yup');

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const companyCreate = yup.object().shape({
  user_id: yup.string().uuid().required(),
  avatar_id: yup.string().uuid(),
  name: yup.string().required(),
  phone: yup
    .string()
    .required()
    .matches(phoneRegExp, 'Phone number is not valid'),
  available_days: yup.object().shape({
    days: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            day: yup.date().required(),
            delivery_hour: yup.object().shape({
              start: yup.date().required(),
              end: yup.date().required(),
            }),
          })
          .required()
      )
      .min(1)
      .required(),
  }),
});

module.exports = { companyCreate };
