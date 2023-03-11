function deleteFile(filePath) {
  try {
    console.log(filePath);
  } catch (error) {
    throw new Error(`delete file at ${filePath} failed ${error.stack}`);
  }
}

module.exports = deleteFile;
