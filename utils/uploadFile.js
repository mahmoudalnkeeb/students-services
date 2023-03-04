const multer = require('multer');
const path = require('path');
const { generate } = require('shortid');
const { extension } = require('mime-types');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('public/images'));
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}_${generate()}.${extension(file.mimetype)}`);
  },
});

const uploadFile = multer({ storage: storage, limits: { fileSize: 3000000 } });

module.exports = uploadFile;
