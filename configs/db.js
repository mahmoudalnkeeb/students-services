const { Pool } = require('pg');
const { dbUser, dbPass, dbHost, dbPort, dbName } = require('./env');

let pool = new Pool({
  user: dbUser,
  password: dbPass,
  host: dbHost,
  port: dbPort,
  database: dbName,
});

module.exports = pool;
