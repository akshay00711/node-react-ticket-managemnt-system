const MongooseTicketAdapter = require("./mongooseTicket.adapter");
const validateAdapter = require("../adapterValidator");
const NoSqlJsonFileTicketAdapter = require("./noSqlJsonFileTicket.adapter");

function createNoSqlAdapter(config) {
  if (config.dbClient === "json-file") {
    const adapter = new NoSqlJsonFileTicketAdapter(config);
    validateAdapter(adapter);
    return adapter;
  }

  if (config.dbClient === "mongoose") {
    const adapter = new MongooseTicketAdapter(config);
    validateAdapter(adapter);
    return adapter;
  }

  throw new Error(
    `Unsupported NoSQL DB_CLIENT "${config.dbClient}". Use "json-file", "mongoose", or set DB_ADAPTER_PATH.`
  );
}

module.exports = createNoSqlAdapter;
