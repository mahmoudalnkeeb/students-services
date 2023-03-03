require('dotenv').config();

let env =
  process.env.ENV == 'dev'
    ? {
        port: 4000,
        dbName: process.env.DB_NAME_DEV,
        dbUser: process.env.DB_USER_DEV,
        dbPass: process.env.DB_PASS_DEV,
        dbHost: process.env.DB_HOST_DEV,
        dbPort: process.env.DB_PORT_DEV,
      }
    : {
        port: process.env.PORT,
        dbName: process.env.DB_NAME,
        dbUser: process.env.DB_USER,
        dbPass: process.env.DB_PASS,
        dbHost: process.env.DB_HOST,
        dbPort: process.env.DB_PORT,
      };

module.exports = env;
