const { request, response } = require('express');
const {
  changeContactInfo,
  changeSocialInfo,
  getColors,
  changeColor,
  getContacts,
  getSocials,
} = require('../utils/appearanceUtils');
const uploadFile = require('../utils/firebase');
const fs = require('fs');
const { INFO_PATH } = require('../configs/constants');

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {*} next
 */
function getLogo(req, res, next) {
  try {
    let info = JSON.parse(fs.readFileSync(INFO_PATH, 'utf-8'));
    res.redirect(info['logo-path']);
  } catch (error) {
    next(
      new Error(`error getting logo file ${error.message}`, { cause: error })
    );
  }
}

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {*} next
 */
function changeLogo(req, res, next) {
  try {
    let logo_path = uploadFile(req.file);
    let info = JSON.parse(fs.readFileSync(INFO_PATH, 'utf-8'));
    info['logo-path'] = logo_path;
    fs.writeFileSync(INFO_PATH, `${JSON.stringify(info, null, 4)}`);
    res.status(200).send(logo_path);
  } catch (error) {
    next(
      new Error(`error while changing logo ${error.message}`, { cause: error })
    );
  }
}

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {*} next
 */
function getContactsInfo(req, res, next) {
  try {
    let info = getContacts();
    res.status(200).json(info);
  } catch (error) {
    next(
      new Error(`error getting info file ${error.message}`, { cause: error })
    );
  }
}
/**
 *
 * @param {request} req
 * @param {response} res
 * @param {*} next
 */
function getSocialByName(req, res, next) {
  try {
    let { name } = req.query;
    if (!name) return res.status(40);
    let info = getSocialByName(name);
    res.status(200).json(info);
  } catch (error) {
    next(
      new Error(`error getting info file ${error.message}`, { cause: error })
    );
  }
}
/**
 *
 * @param {request} req
 * @param {response} res
 * @param {*} next
 */
function getContactByName(req, res, next) {
  try {
    let info = getContactByName(req.query.name);
    res.status(200).json(info);
  } catch (error) {
    next(
      new Error(`error getting info file ${error.message}`, { cause: error })
    );
  }
}
/**
 *
 * @param {request} req
 * @param {response} res
 * @param {*} next
 */
function getSocialInfo(req, res, next) {
  try {
    let info = getSocials();
    res.status(200).json(info);
  } catch (error) {
    next(
      new Error(`error getting info file ${error.message}`, { cause: error })
    );
  }
}

function changeContact(req, res, next) {
  try {
    let { contactName, contactValue } = req.body;
    let info = changeContactInfo(contactName, contactValue);
    res.status(200).json(info);
  } catch (error) {
    next(
      new Error(`error getting info file ${error.message}`, { cause: error })
    );
  }
}

function changeSocial(req, res, next) {
  try {
    let { socialName, socialValue } = req.body;
    let info = changeSocialInfo(socialName, socialValue);
    res.status(200).json(info);
  } catch (error) {
    next(
      new Error(`error getting info file ${error.message}`, { cause: error })
    );
  }
}

function getTheme(req, res, next) {
  try {
    let theme = getColors();
    res.status(200).json(theme);
  } catch (error) {
    next(
      new Error(`error getting info file ${error.message}`, { cause: error })
    );
  }
}

function changeThemeColor(req, res, next) {
  try {
    let { colorName, colorValue } = req.body;
    let theme = changeColor(colorName, colorValue);
    res.status(200).json(theme);
  } catch (error) {
    next(
      new Error(`error getting info file ${error.message}`, { cause: error })
    );
  }
}
module.exports = {
  getLogo,
  changeLogo,
  getContactsInfo,
  getSocialInfo,
  changeContact,
  changeSocial,
  getTheme,
  changeThemeColor,
};
