require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 8080),
  corsOrigin: process.env.CORS_ORIGIN || "*",
};

module.exports = config;
