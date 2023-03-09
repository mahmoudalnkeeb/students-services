const fs = require('fs');
const path = require('path');
const {
  SERVICES_IMAGES_PATH,
  SECTIONS_IMAGES_PATH,
} = require('../configs/constants');

function deleteFile(filePath, folder) {
  try {
    switch (folder) {
      case 'services':
        if (
          fs.existsSync(path.resolve(path.join(SERVICES_IMAGES_PATH, filePath)))
        )
          fs.rmSync(path.resolve(filePath));
        break;
      case 'sections':
        if (
          fs.existsSync(path.resolve(path.join(SECTIONS_IMAGES_PATH, filePath)))
        )
          fs.rmSync(path.resolve(filePath));
        break;

      default:
        break;
    }
  } catch (error) {
    throw new Error(`delete file at ${filePath} failed ${error.stack}`);
  }
}

module.exports = deleteFile;
