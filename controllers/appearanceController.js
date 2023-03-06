const { request, response } = require('express');
const { LOGO_PATH } = require('../configs/constants');
const {
  getInfoJson,
  changeContactInfo,
  changeSocialInfo,
  getColors,
  changeColor,
} = require('../utils/appearanceUtils');

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {*} next
 */
function getLogo(req, res, next) {
  try {
    res.status(200).sendFile(LOGO_PATH);
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
    res.status(200).sendFile(req.file.path);
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
function getInfo(req, res, next) {
  try {
    let info = getInfoJson();
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
  getInfo,
  changeContact,
  changeSocial,
  getTheme,
  changeThemeColor,
};
