const { createTransport } = require('nodemailer');

const remetente = createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = (to, subject, text, result) => {
  const email = {
    from: 'contato@dcdaniiel.dev',
    subject,
    to,
    text,
  };
  return remetente.sendMail(email, result);
};

module.exports = {
  sendEmail,
};
