const errorHandler = (err, req, res, next) => {
  // default to 500 server error
  const {
    output: { statusCode },
  } = err;
  res.status(statusCode);
  res.json(err);
};
module.exports = errorHandler;
