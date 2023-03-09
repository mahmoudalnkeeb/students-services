const fs = require('fs');
const moment = require('moment/moment');

module.exports = function errHandler(err, req, res, next) {
  if (err) {
    fs.appendFileSync(
      './logs/errors.log',
      ` [${moment().format(
        'MMMM Do YYYY, h:mm:ss a'
      )}] ${err}\n ----------------------- \n`
    );
    return res.status(500).json({
      message: err.message,
      code: err.code || 500,
      cause: err.cause || null,
    });
  }
};
