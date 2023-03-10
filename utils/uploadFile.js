const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { generate } = require('shortid');
const { extension } = require('mime-types');
const {
  LOGO_PATH,
  SECTIONS_IMAGES_PATH,
  SERVICES_IMAGES_PATH,
} = require('../configs/constants');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname == 'section')
      return cb(null, path.resolve(SECTIONS_IMAGES_PATH));
    if (file.fieldname == 'service')
      return cb(null, path.resolve(SERVICES_IMAGES_PATH));
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
