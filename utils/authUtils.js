const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { jwtSecert, rounds } = require('../configs/env');

function createJwt(payload) {
  let secert = hash(jwtSecert);
  return { token: jwt.sign(payload, secert.hashed), secertSalt: secert.salt };
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

function verfiyJwt(token, secert, salt, hash) {
  if (compare(secert + salt, hash)) return jwt.verify(token);
  return false;
}

module.exports = { createJwt, hash, compare, decodeJwt, verfiyJwt };
