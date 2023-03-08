const { request, response } = require('express');
const services = require('../models/Service');

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

async function getServices(req, res, next) {
  try {
    let allServices = await services.getServices();
    res.status(200).json(allServices);
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

async function getServicesPagination(req, res, next) {
  try {
    let { page, limit } = req.query;
    let allServices = await services.getServicesPagination(page, limit);
    res.status(200).json(allServices);
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

async function getOneService(req, res, next) {
  try {
    let { id } = req.params;
    let service = await services.getOneService(id);
    res.status(200).json(service);
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

async function createService(req, res, next) {
  try {
    let { name, desc, imagePath } = req.body;
    let service = await services.createService(name, desc, imagePath);
    res.status(201).json(service);
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

async function updateService(req, res, next) {
  try {
    let { name, desc, imagePath, isAvailable } = req.body;
    let { id } = req.params;
    let service = await services.updateService(
      id,
      name,
      desc,
      imagePath,
      isAvailable
    );
    res.status(200).json(service);
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

async function deleteService(req, res, next) {
  try {
    let { id } = req.params;
    let service = await services.deleteService(id);
    res.status(204).json(service);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getServices,
  getServicesPagination,
  getOneService,
  createService,
  updateService,
  deleteService,
};
