const fs = require("fs/promises");
const path = require("path");
const { toRow, toTicket } = require("./sqlTicket.mapper");

class SqlJsonFileTicketAdapter {
  constructor(config) {
    this.filePath = config.filePath;
    this.tableName = config.sql.tableName;
  }

  async ensureFile() {
    await fs.mkdir(path.dirname(this.filePath), { recursive: true });

    try {
      await fs.access(this.filePath);
    } catch (error) {
      await fs.writeFile(this.filePath, JSON.stringify({ [this.tableName]: [] }, null, 2), "utf8");
    }
  }

  async readRows() {
    await this.ensureFile();
    const content = await fs.readFile(this.filePath, "utf8");
    const database = JSON.parse(content || "{}");
    if (Array.isArray(database)) {
      return database.map(toRow);
    }

    return database[this.tableName] || [];
  }

  async writeRows(rows) {
    await this.ensureFile();
    const content = await fs.readFile(this.filePath, "utf8");
    const parsed = JSON.parse(content || "{}");
    const database = Array.isArray(parsed) ? {} : parsed;
    database[this.tableName] = rows;
    await fs.writeFile(this.filePath, JSON.stringify(database, null, 2), "utf8");
  }

  async findAll(filters = {}) {
    const { status } = filters;
    const rows = await this.readRows();
    return rows.filter((row) => !status || row.status === status).map(toTicket);
  }

  async findById(id) {
    const rows = await this.readRows();
    const row = rows.find((item) => item.id === id);
    return row ? toTicket(row) : null;
  }

  async create(ticket) {
    const rows = await this.readRows();
    rows.push(toRow(ticket));
    await this.writeRows(rows);
    return ticket;
  }

  async update(id, ticket) {
    const rows = await this.readRows();
    const index = rows.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }

    rows[index] = toRow(ticket);
    await this.writeRows(rows);
    return ticket;
  }

  async delete(id) {
    const rows = await this.readRows();
    const nextRows = rows.filter((row) => row.id !== id);
    await this.writeRows(nextRows);
    return nextRows.length < rows.length;
  }
}

module.exports = SqlJsonFileTicketAdapter;
