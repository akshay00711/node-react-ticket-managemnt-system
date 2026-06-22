const app = require("./app");
const appConfig = require("./config/app.config");
const databaseConfig = require("./config/database.config");

const server = app.listen(appConfig.port, () => {
  console.log(`Ticketing API listening on http://localhost:${appConfig.port}`);
  console.log(`Data source: ${databaseConfig.dataSource}`);
  if (databaseConfig.dataSource === "database") {
    console.log(`Database flow: ${databaseConfig.dbFlow}`);
    console.log(`Database client: ${databaseConfig.dbClient}`);
  }
});

function shutdown(signal) {
  console.log(`${signal} received. Closing server.`);
  server.close(() => {
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
