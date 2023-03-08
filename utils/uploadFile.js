const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { generate } = require('shortid');
const { extension } = require('mime-types');
const { LOGO_PATH } = require('../configs/constants');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('public/images'));
  },
  filename: function (req, file, cb) {
    if (file.fieldname == 'logo') {
      fs.rmSync(LOGO_PATH);
      return cb(null, `${file.fieldname}.png`);
    }
    cb(null, `${file.fieldname}_${generate()}.${extension(file.mimetype)}`);
  },
});

const uploadFile = multer({ storage: storage, limits: { fileSize: 20000000 } });

module.exports = uploadFile;
