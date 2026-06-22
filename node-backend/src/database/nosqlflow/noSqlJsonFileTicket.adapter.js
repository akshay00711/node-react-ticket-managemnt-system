const fs = require("fs/promises");
const path = require("path");

class NoSqlJsonFileTicketAdapter {
  constructor(config) {
    this.filePath = config.filePath;
    this.collectionName = config.nosql.collectionName;
  }

  async ensureFile() {
    await fs.mkdir(path.dirname(this.filePath), { recursive: true });

    try {
      await fs.access(this.filePath);
    } catch (error) {
      await fs.writeFile(
        this.filePath,
        JSON.stringify({ [this.collectionName]: [] }, null, 2),
        "utf8"
      );
    }
  }

  async readCollection() {
    await this.ensureFile();
    const content = await fs.readFile(this.filePath, "utf8");
    const database = JSON.parse(content || "{}");
    if (Array.isArray(database)) {
      return database;
    }

    return database[this.collectionName] || [];
  }

  async writeCollection(tickets) {
    await this.ensureFile();
    const content = await fs.readFile(this.filePath, "utf8");
    const parsed = JSON.parse(content || "{}");
    const database = Array.isArray(parsed) ? {} : parsed;
    database[this.collectionName] = tickets;
    await fs.writeFile(this.filePath, JSON.stringify(database, null, 2), "utf8");
  }

  async findAll(filters = {}) {
    const { status } = filters;
    const tickets = await this.readCollection();
    return tickets.filter((ticket) => !status || ticket.status === status);
  }

  async findById(id) {
    const tickets = await this.readCollection();
    return tickets.find((ticket) => ticket.id === id) || null;
  }

  async create(ticket) {
    const tickets = await this.readCollection();
    tickets.push(ticket);
    await this.writeCollection(tickets);
    return ticket;
  }

  async update(id, ticket) {
    const tickets = await this.readCollection();
    const index = tickets.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }

    tickets[index] = ticket;
    await this.writeCollection(tickets);
    return tickets[index];
  }

  async delete(id) {
    const tickets = await this.readCollection();
    const nextTickets = tickets.filter((ticket) => ticket.id !== id);
    await this.writeCollection(nextTickets);
    return nextTickets.length < tickets.length;
  }
}

module.exports = NoSqlJsonFileTicketAdapter;
