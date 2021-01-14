const yup = require('yup');

const categoryCreate = yup.object().shape({ name: yup.string().required() });

module.exports = { categoryCreate };
