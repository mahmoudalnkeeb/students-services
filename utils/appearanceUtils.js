const fs = require('fs');
const { COLORS_PATH, INFO_PATH } = require('../configs/constants');

function changeColor(colorName, value) {
  try {
    let colors = JSON.parse(fs.readFileSync(COLORS_PATH, 'utf-8'));
    colors[colorName] = value;
    fs.writeFileSync(COLORS_PATH, `${colors}`);
    return colors;
  } catch (error) {
    throw error;
  }
}

function getColors() {
  try {
    return JSON.parse(fs.readFileSync(COLORS_PATH, 'utf-8'));
  } catch (error) {
    throw error;
  }
}

function getInfoJson() {
  try {
    return JSON.parse(fs.readFileSync(INFO_PATH, 'utf-8'));
  } catch (error) {
    throw error;
  }
}

function changeContactInfo(name, value) {
  try {
    let info = JSON.parse(fs.readFileSync(INFO_PATH, 'utf-8'));
    info.contactInfo[name] = value;
    fs.writeFileSync(INFO_PATH, `${info}`);
    return info.contactInfo;
  } catch (error) {
    throw error;
  }
}
function changeSocialInfo(name, value) {
  try {
    let info = JSON.parse(fs.readFileSync(INFO_PATH, 'utf-8'));
    info.socials[name] = value;
    fs.writeFileSync(INFO_PATH, `${info}`);
    return info.socials;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  changeColor,
  getColors,
  getInfoJson,
  changeContactInfo,
  changeSocialInfo,
};
