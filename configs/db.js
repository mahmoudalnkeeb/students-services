const { Pool } = require('pg');
const { dbUser, dbPass, dbHost, dbPort, dbName } = require('./env');

let pool = new Pool({
  user: dbUser,
  password: dbPass,
  host: dbHost,
  port: dbPort,
  database: dbName,
  max: 20,
  idleTimeoutMillis: 1000,
  connectionTimeoutMillis: 1000,
  maxUses: 7500
});

module.exports = pool;
