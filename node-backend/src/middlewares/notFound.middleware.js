const ApiError = require("../utils/ApiError");

function notFound(req, res, next) {
  next(new ApiError(404, `Route ${req.method} ${req.originalUrl} was not found.`));
}

module.exports = notFound;
