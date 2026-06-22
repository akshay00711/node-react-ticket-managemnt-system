const { toTicket, toRow } = require("./sqlTicket.mapper");

class CustomSqlTicketAdapterExample {
  constructor(config) {
    this.connectionString = config.sql.connectionString;
    this.tableName = config.sql.tableName;
  }

  async findAll(filters = {}) {
    // PostgreSQL/MySQL-style example:
    // const { rows } = await db.query(
    //   `SELECT * FROM ${this.tableName} WHERE ($1::text IS NULL OR status = $1)`,
    //   [filters.status || null]
    // );
    // return rows.map(toTicket);
    throw new Error("findAll is not implemented for the custom SQL adapter.");
  }

  async findById(id) {
    // const { rows } = await db.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
    // return rows[0] ? toTicket(rows[0]) : null;
    throw new Error("findById is not implemented for the custom SQL adapter.");
  }

  async create(ticket) {
    const row = toRow(ticket);
    // await db.query(
    //   `INSERT INTO ${this.tableName}
    //    (id, title, description, status, priority, assignee, created_at, updated_at)
    //    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    //   [row.id, row.title, row.description, row.status, row.priority, row.assignee, row.created_at, row.updated_at]
    // );
    // return ticket;
    throw new Error("create is not implemented for the custom SQL adapter.");
  }

  async update(id, ticket) {
    const row = toRow(ticket);
    // const result = await db.query(
    //   `UPDATE ${this.tableName}
    //    SET title = $2, description = $3, status = $4, priority = $5, assignee = $6, updated_at = $7
    //    WHERE id = $1`,
    //   [id, row.title, row.description, row.status, row.priority, row.assignee, row.updated_at]
    // );
    // return result.rowCount > 0 ? ticket : null;
    throw new Error("update is not implemented for the custom SQL adapter.");
  }

  async delete(id) {
    // const result = await db.query(`DELETE FROM ${this.tableName} WHERE id = $1`, [id]);
    // return result.rowCount > 0;
    throw new Error("delete is not implemented for the custom SQL adapter.");
  }
}

function createTicketAdapter(config) {
  return new CustomSqlTicketAdapterExample(config);
}

module.exports = {
  createTicketAdapter,
};
