const { request, response } = require('express');
const sections = require('../models/Section');

/*--------------
  @param {request} req
  @param {response} res
  @param {*} next

async function name(req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
}
---------------*/

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {*} next
 */

async function getSections(req, res, next) {
  try {
    let allSections = await sections.getSections();
    res.status(200).json(allSections);
  } catch (error) {
    next(error);
  }
}

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {*} next
 */
async function getSectionsPagination(req, res, next) {
  try {
    let { page, limit } = req.query;
    let allSections = await sections.getSectionsPagination(page, limit);
    res.status(200).json(allSections);
  } catch (error) {
    next(error);
  }
}

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {*} next
 */

async function getOneSection(req, res, next) {
  try {
    let { id } = req.params;
    let section = await sections.getOneSection(id);
    res.status(200).json(section);
  } catch (error) {
    next(error);
  }
}

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {*} next
 */

async function createSection(req, res, next) {
  try {
    let { name, desc, imagePath } = req.body;
    let section = await sections.createSection(name, desc, imagePath);
    console.log(section);
    res.status(201).json(section);
  } catch (error) {
    next(error);
  }
}

/**
 *
 * @param {request} req
 * @param {response} res
 * @param {*} next
 */

async function updateSection(req, res, next) {
  try {
    let { name, desc, imagePath } = req.body;
    let { id } = req.params;
    let section = await sections.updateSection(id, name, desc, imagePath);
    res.status(200).json(section);
  } catch (error) {
    next(error);
  }
}
/**
 *
 * @param {request} req
 * @param {response} res
 * @param {*} next
 */

async function deleteSection(req, res, next) {
  try {
    let { id } = req.params;
    let section = await sections.deleteSection(id);
    res.status(204).json(section);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getSections,
  getSectionsPagination,
  getOneSection,
  createSection,
  updateSection,
  deleteSection,
};
