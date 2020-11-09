const { auth } = require('../controllers');

module.exports = (router) => {
  router.get('/', auth.get);
};
