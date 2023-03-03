module.exports = function errHandler(err, req, res, next) {
  if (err) return res.status(200).send('internal server error');
};
