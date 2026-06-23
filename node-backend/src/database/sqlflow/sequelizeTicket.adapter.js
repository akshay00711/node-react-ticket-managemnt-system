const fs = require("fs/promises");
const path = require("path");
const { DataTypes, Sequelize } = require("sequelize");
const { toTicket, toRow } = require("./sqlTicket.mapper");

class SequelizeTicketAdapter {
  constructor(config) {
    this.config = config;
    this.sequelize = this.createSequelize();
    this.Ticket = this.createTicketModel();
    this.initPromise = null;
  }

  createSequelize() {
    const options = {
      dialect: this.config.sql.dialect,
      logging: false,
    };

    if (this.config.sql.connectionString) {
      return new Sequelize(this.config.sql.connectionString, options);
    }

    return new Sequelize({
      ...options,
      storage: this.config.sql.sqliteStorage,
    });
  }

  createTicketModel() {
    return this.sequelize.define(
      "Ticket",
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        status: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        priority: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        assignee: {
          type: DataTypes.STRING(120),
          allowNull: true,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        tableName: this.config.sql.tableName,
        timestamps: false,
      }
    );
  }

  async ensureInitialized() {
    if (!this.initPromise) {
      this.initPromise = (async () => {
        if (this.config.sql.dialect === "sqlite" && !this.config.sql.connectionString) {
          await fs.mkdir(path.dirname(this.config.sql.sqliteStorage), { recursive: true });
        }

        await this.sequelize.authenticate();
        await this.Ticket.sync();
      })();
    }

    return this.initPromise;
  }

  async findAll(filters = {}) {
    await this.ensureInitialized();
    const where = filters.status ? { status: filters.status } : {};
    const rows = await this.Ticket.findAll({ where, raw: true });
    return rows.map(toTicket);
  }

  async findById(id) {
    await this.ensureInitialized();
    const row = await this.Ticket.findByPk(id, { raw: true });
    return row ? toTicket(row) : null;
  }

  async create(ticket) {
    await this.ensureInitialized();
    await this.Ticket.create(toRow(ticket));
    return ticket;
  }

  async update(id, ticket) {
    await this.ensureInitialized();
    const existingTicket = await this.Ticket.findByPk(id);
    if (!existingTicket) {
      return null;
    }

    await existingTicket.update(toRow(ticket));
    return ticket;
  }

  async delete(id) {
    await this.ensureInitialized();
    const deletedCount = await this.Ticket.destroy({ where: { id } });
    return deletedCount > 0;
  }
}

module.exports = SequelizeTicketAdapter;
