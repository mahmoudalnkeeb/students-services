const multer = require('multer');
const path = require('path');
const { generate } = require('shortid');
const { extension } = require('mime-types');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(path.join(process.cwd(), 'public/images')));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        '-' +
        generate() +
        file.mimetype +
        extension(file.mimetype)
    );
  },
});

const uploadFile = multer({ storage: storage });

module.exports = uploadFile;
