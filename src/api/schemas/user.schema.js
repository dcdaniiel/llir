const yup = require('yup');

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const userCreate = yup.object().shape({
  avatar_id: yup.string().uuid(),
  name: yup.string().required(),
  cpf: yup.string().min(11).max(11).required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8, 'minimo 8 letras')
    .matches(/[a-z]/, 'pelo menos uma letra minuscula')
    .matches(/[A-Z]/, 'pelo menos uma letra maiuscula')
    .matches(/[0-9]/, 'pelo menos um numero')
    .required(),
  phone: yup
    .string()
    .required()
    .matches(phoneRegExp, 'Phone number is not valid'),
  birthdate: yup.date().required(),
  cod: yup.string().required(),
});

module.exports = { userCreate };
