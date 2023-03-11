const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { jwtSecret, rounds } = require('../configs/env');

function createJwt(payload, exp) {
  return { token: jwt.sign(payload, jwtSecret, { expiresIn: exp }) };
}

function hash(data) {
  let salt = bcrypt.genSaltSync(rounds);
  let hashed = bcrypt.hashSync(data + salt, rounds);
  return { salt, hashed };
}

function compare(string, salt, hash) {
  return bcrypt.compareSync(string + salt, hash);
}

function decodeJwt(token) {
  return jwt.decode(token);
}

function verfiyJwt(token) {
  if (!jwt.verify(token)) return false;
  return jwt.verify(token);
}

module.exports = { createJwt, hash, compare, decodeJwt, verfiyJwt };
