const path = require('path');

const constants = {
  CUSTOM_CSS_PATH: path.resolve(
    path.join(process.cwd(), 'public/css/custom.css')
  ),
  COLORS_PATH: path.resolve(path.join(process.cwd(), 'public/colors.json')),
  INFO_PATH: path.resolve(path.join(process.cwd(), 'public/info.json')),
};

module.exports = constants;
