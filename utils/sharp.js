const sharp = require('sharp');
const {
  SERVICE_IMAGE_W,
  SERVICE_IMAGE_H,
  SERVICES_IMAGES_PATH,
} = require('../configs/constants');
const deleteFile = require('./deleteFile');

async function serviceImage(image) {
  try {
    let path = `${SERVICES_IMAGES_PATH}/${image.filename.split('.')[0]}.webp`;
    await sharp(image.path)
      .resize(SERVICE_IMAGE_W, SERVICE_IMAGE_H)
      .webp()
      .toFile(path);
    deleteFile(image.path);
    return path;
  } catch (error) {
    throw new Error(`error occured when intializing image ${error.message}`, {
      cause: error,
    });
  }
}

module.exports = serviceImage;
