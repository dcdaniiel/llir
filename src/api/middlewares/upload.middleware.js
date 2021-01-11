const multer = require('@koa/multer');
const { v4 } = require('uuid');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${__dirname}/../public/uploads`);
  },
  filename(req, file, cb) {
    cb(null, `${v4()}${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

module.exports = { upload };
