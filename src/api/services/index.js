const UserService = require('./user.service');
const AuthService = require('./auth.service');
const CompanyService = require('./company.service');
const EmailService = require('./email/workerSendMail');

module.exports = { UserService, AuthService, CompanyService, EmailService };
