const fs = require('fs');
const path = require('path');

function deleteFile(filePath) {
  try {
    if (fs.existsSync(path.resolve(filePath)))
      fs.rmSync(path.resolve(filePath));
  } catch (error) {
    throw new Error(`delete file at ${filePath} failed ${error.stack}`);
  }
}

module.exports = deleteFile;
