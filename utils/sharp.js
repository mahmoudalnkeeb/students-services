// const sharp = require('sharp'); 
const {
  SERVICE_IMAGE_W,
  SERVICE_IMAGE_H,
  SERVICES_IMAGES_PATH,
  SECTIONS_IMAGES_PATH,
  IMAGES_PATH,
} = require('../configs/constants');
const deleteFile = require('./deleteFile');

async function serviceImage(image) {
  try {
    let path;
    if (image.fieldname == 'service')
      path = `${SERVICES_IMAGES_PATH}/${image.filename.split('.')[0]}.webp`;
    else if (image.fieldname == 'section')
      path = `${SECTIONS_IMAGES_PATH}/${image.filename.split('.')[0]}.webp`;
    else path = `${IMAGES_PATH}/${image.filename.split('.')[0]}.webp`;

    // await sharp(image.path)
    //   .resize(SERVICE_IMAGE_W, SERVICE_IMAGE_H)
    //   .webp({ quality: 100 })
    //   .toFile(path);
    deleteFile(image.path);
    return filename
  } catch (error) {
    throw new Error(`error occured when intializing image ${error.message}`, {
      cause: error,
    });
  }
}

module.exports = serviceImage;
