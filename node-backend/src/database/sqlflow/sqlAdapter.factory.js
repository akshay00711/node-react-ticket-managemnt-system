const validateAdapter = require("../adapterValidator");
const SequelizeTicketAdapter = require("./sequelizeTicket.adapter");
const SqlJsonFileTicketAdapter = require("./sqlJsonFileTicket.adapter");

function createSqlAdapter(config) {
  if (config.dbClient === "json-file" || config.dbClient === "sql-json-file") {
    const adapter = new SqlJsonFileTicketAdapter(config);
    validateAdapter(adapter);
    return adapter;
  }

  if (config.dbClient === "sequelize") {
    const adapter = new SequelizeTicketAdapter(config);
    validateAdapter(adapter);
    return adapter;
  }

  throw new Error(
    `Unsupported SQL DB_CLIENT "${config.dbClient}". Use "sql-json-file", "sequelize", or set DB_ADAPTER_PATH.`
  );
}

module.exports = createSqlAdapter;
