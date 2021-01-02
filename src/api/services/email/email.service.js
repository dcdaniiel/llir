const { createTransport } = require('nodemailer');
const templates = require('./templates');

const remetente = createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = (template, user, result) => {
  const content = templates[template](user);
  const email = {
    from: 'contato@dcdaniiel.dev',
    subject: content.subject,
    to: user.email,
    html: content.html,
  };
  return remetente.sendMail(email, result);
};

module.exports = {
  sendEmail,
};
