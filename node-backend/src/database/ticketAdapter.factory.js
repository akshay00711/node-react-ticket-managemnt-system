const databaseConfig = require("../config/database.config");
const validateAdapter = require("./adapterValidator");
const createNoSqlAdapter = require("./nosqlflow/noSqlAdapter.factory");
const createSqlAdapter = require("./sqlflow/sqlAdapter.factory");

function createDatabaseAdapter() {
  if (databaseConfig.adapterPath) {
    const customAdapterModule = require(databaseConfig.adapterPath);
    const adapter = customAdapterModule.createTicketAdapter(databaseConfig);
    validateAdapter(adapter);
    return adapter;
  }

  if (databaseConfig.dbFlow === "sql") {
    return createSqlAdapter(databaseConfig);
  }

  if (databaseConfig.dbFlow === "nosql") {
    return createNoSqlAdapter(databaseConfig);
  }

  throw new Error(
    `Unsupported DB_FLOW "${databaseConfig.dbFlow}". Use "sql" or "nosql".`
  );
}

module.exports = createDatabaseAdapter;
