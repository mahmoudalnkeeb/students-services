const fs = require('fs');

module.exports = function errHandler(err, req, res, next) {
  if (err) {
    fs.appendFileSync('./logs/errors.log', `${err}\n ----------------------- \n`);
    return res.status(500).json({
      message: err.message,
      code: err.code || 500,
      cause: err.cause || null,
    });
  }
};
