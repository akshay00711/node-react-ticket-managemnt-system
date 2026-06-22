const path = require("path");

const dataSource = (process.env.DATA_SOURCE || "mock").toLowerCase();
const dbFlow = (process.env.DB_FLOW || "nosql").toLowerCase();
const dbClient = (process.env.DB_CLIENT || "json-file").toLowerCase();

const databaseConfig = {
  dataSource,
  dbFlow,
  dbClient,
  filePath: path.resolve(process.cwd(), process.env.DB_FILE_PATH || "./data/tickets.json"),
  sql: {
    tableName: process.env.SQL_TICKETS_TABLE || "tickets",
    connectionString: process.env.SQL_CONNECTION_STRING || "",
  },
  nosql: {
    collectionName: process.env.NOSQL_TICKETS_COLLECTION || "tickets",
    connectionString: process.env.NOSQL_CONNECTION_STRING || "",
    databaseName: process.env.NOSQL_DATABASE_NAME || "ticketing",
  },
  adapterPath: process.env.DB_ADAPTER_PATH
    ? path.resolve(process.cwd(), process.env.DB_ADAPTER_PATH)
    : "",
};

module.exports = databaseConfig;
