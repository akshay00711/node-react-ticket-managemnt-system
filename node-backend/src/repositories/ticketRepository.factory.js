const databaseConfig = require("../config/database.config");
const createDatabaseAdapter = require("../database/ticketAdapter.factory");
const DatabaseTicketRepository = require("./databaseTicket.repository");
const MockTicketRepository = require("./mockTicket.repository");

function createTicketRepository() {
  if (databaseConfig.dataSource === "mock") {
    return new MockTicketRepository();
  }

  if (databaseConfig.dataSource === "database") {
    return new DatabaseTicketRepository(createDatabaseAdapter());
  }

  throw new Error(`Unsupported DATA_SOURCE "${databaseConfig.dataSource}". Use "mock" or "database".`);
}

module.exports = createTicketRepository;
