const appConfig = require("../config/app.config");

function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;
  const response = {
    message: error.message || "Unexpected server error.",
  };

  if (error.details) {
    response.details = error.details;
  }

  if (appConfig.env !== "production") {
    response.stack = error.stack;
  }

  res.status(statusCode).json(response);
}

module.exports = errorHandler;
