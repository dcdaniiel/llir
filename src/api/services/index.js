const UserService = require('./user.service');
const AuthService = require('./auth.service');
const AddressService = require('./address.service');
const CompanyService = require('./company.service');
const EmailService = require('./email/workerSendMail');
const UploadService = require('./upload.service');

module.exports = {
  UserService,
  AuthService,
  CompanyService,
  EmailService,
  AddressService,
  UploadService,
};
