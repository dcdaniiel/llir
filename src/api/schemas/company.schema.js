const yup = require('yup');

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const companyCreate = yup.object().shape({
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
            weekDay: yup.string().required(),
            delivery_hour: yup.object().shape({
              start: yup.string().required(),
              end: yup.string().required(),
            }),
          })
          .required()
      )
      .min(1)
      .required(),
    exceptions: yup.array().of(
      yup.object().shape({
        day: yup.string().required(),
        description: yup.string().required(),
        delivery_hour: yup.object().shape({
          start: yup.string().required(),
          end: yup.string().required(),
        }),
      })
    ),
  }),
  token: yup.string().required(),
});
const companyCreateInvite = yup.object().shape({
  email: yup.string().email().required(),
});

module.exports = { companyCreateInvite, companyCreate };
