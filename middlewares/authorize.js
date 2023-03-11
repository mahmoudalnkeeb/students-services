const { request, response } = require('express');
const { verfiyJwt } = require('../utils/authUtils');
/**
 *
 * @param {request} req
 * @param {response} res
 * @param {*} next
 */

async function auth() {
  return {
    authorize: (req, res, next) => {
      let token = req.headers['x-access-token'];
      if (!token) return res.status(403).send('token required');
      let sub = verfiyJwt(token);
      if (!sub) return res.status(403).send('unauthorized');
      next();
    },
    authenticate: (req, res, next) => {
      let { username, password } = req.body;
      
      next();
    },
  };
}
