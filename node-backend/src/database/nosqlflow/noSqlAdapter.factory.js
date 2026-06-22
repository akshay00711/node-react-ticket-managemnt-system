const validateAdapter = require("../adapterValidator");
const NoSqlJsonFileTicketAdapter = require("./noSqlJsonFileTicket.adapter");

function createNoSqlAdapter(config) {
  if (config.dbClient === "json-file") {
    const adapter = new NoSqlJsonFileTicketAdapter(config);
    validateAdapter(adapter);
    return adapter;
  }

  throw new Error(
    `Unsupported NoSQL DB_CLIENT "${config.dbClient}". Set DB_ADAPTER_PATH for a custom NoSQL adapter.`
  );
}

module.exports = createNoSqlAdapter;
