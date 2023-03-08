const path = require('path');

const constants = {
  LOGO_PATH: path.resolve(path.join(process.cwd(), 'public/images/logo.png')),
  CUSTOM_CSS_PATH: path.resolve(
    path.join(process.cwd(), 'public/css/custom.css')
  ),
  COLORS_PATH: path.resolve(path.join(process.cwd(), 'public/colors.json')),
  INFO_PATH: path.resolve(path.join(process.cwd(), 'public/info.json')),
  SERVICES_IMAGES_PATH: path.resolve(
    path.join(process.cwd(), 'public/images/services')
  ),
  SERVICE_IMAGE_W: 176,
  SERVICE_IMAGE_H: 160,
};

module.exports = constants;
