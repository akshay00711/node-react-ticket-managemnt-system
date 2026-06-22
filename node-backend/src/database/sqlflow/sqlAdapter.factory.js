const validateAdapter = require("../adapterValidator");
const SqlJsonFileTicketAdapter = require("./sqlJsonFileTicket.adapter");

function createSqlAdapter(config) {
  if (config.dbClient === "json-file" || config.dbClient === "sql-json-file") {
    const adapter = new SqlJsonFileTicketAdapter(config);
    validateAdapter(adapter);
    return adapter;
  }

  throw new Error(
    `Unsupported SQL DB_CLIENT "${config.dbClient}". Set DB_ADAPTER_PATH for a custom SQL adapter.`
  );
}

module.exports = createSqlAdapter;
