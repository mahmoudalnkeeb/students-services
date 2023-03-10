const { request, response } = require('express');
const { LOGO_PATH } = require('../configs/constants');
const {
  changeContactInfo,
  changeSocialInfo,
  getColors,
  changeColor,
  getContacts,
  getSocials,
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
    let {name} = req.query
    if(!name) return res.status(40)
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
