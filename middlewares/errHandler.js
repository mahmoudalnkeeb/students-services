const fs = require('fs');

module.exports = function errHandler(err, req, res, next) {
  if (err) {
    fs.createWriteStream('../logs/errors.log');
    return res.status(500).send('internal server error');
  }
};
