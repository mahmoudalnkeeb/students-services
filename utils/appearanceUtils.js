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

function getContacts() {
  try {
    return JSON.parse(fs.readFileSync(INFO_PATH, 'utf-8')).contactInfo;
  } catch (error) {
    throw error;
  }
}
function getContactByName(name) {
  try {
    return JSON.parse(fs.readFileSync(INFO_PATH, 'utf-8')).contactInfo.filter(
      (contact) => contact.name == name
    );
  } catch (error) {
    throw error;
  }
}

function getSocials() {
  try {
    return JSON.parse(fs.readFileSync(INFO_PATH, 'utf-8')).socials;
  } catch (error) {
    throw error;
  }
}
function getSocialByName(name) {
  try {
    return JSON.parse(fs.readFileSync(INFO_PATH, 'utf-8')).socials.filter(
      (social) => social.name == name
    );
  } catch (error) {
    throw error;
  }
}

function changeContactInfo(name, value) {
  try {
    let info = JSON.parse(fs.readFileSync(INFO_PATH, 'utf-8'));
    info.contactInfo.map((contact) => {
      if (contact.name == name) {
        contact.value = value;
      }
    });
    fs.writeFileSync(INFO_PATH, `${info}`);
    return info.contactInfo;
  } catch (error) {
    throw error;
  }
}
function changeSocialInfo(name, value) {
  try {
    let info = JSON.parse(fs.readFileSync(INFO_PATH, 'utf-8'));
    info.socials.map((social) => {
      if (social.name == name) {
        social.value = value;
      }
    });
    fs.writeFileSync(INFO_PATH, `${info}`);
    return info.socials;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  changeColor,
  getColors,
  getContacts,
  getSocials,
  getContactByName,
  getSocialByName,
  changeContactInfo,
  changeSocialInfo,
};
