const mongoose = require("mongoose");

class MongooseTicketAdapter {
  constructor(config) {
    this.config = config;
    this.Ticket = this.createTicketModel();
    this.initPromise = null;
  }

  createTicketModel() {
    const schema = new mongoose.Schema(
      {
        id: {
          type: String,
          required: true,
          unique: true,
          index: true,
        },
        title: {
          type: String,
          required: true,
          maxlength: 200,
        },
        description: {
          type: String,
          maxlength: 5000,
          default: "",
        },
        status: {
          type: String,
          required: true,
          enum: ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"],
        },
        priority: {
          type: String,
          required: true,
          enum: ["LOW", "MEDIUM", "HIGH", "URGENT"],
        },
        assignee: {
          type: String,
          maxlength: 120,
          default: "",
        },
        createdAt: {
          type: String,
          required: true,
        },
        updatedAt: {
          type: String,
          required: true,
        },
      },
      {
        collection: this.config.nosql.collectionName,
        versionKey: false,
      }
    );

    return mongoose.models.Ticket || mongoose.model("Ticket", schema);
  }

  async ensureInitialized() {
    if (!this.config.nosql.connectionString) {
      throw new Error("NOSQL_CONNECTION_STRING is required when DB_CLIENT=mongoose.");
    }

    if (!this.initPromise) {
      this.initPromise = mongoose.connect(this.config.nosql.connectionString, {
        dbName: this.config.nosql.databaseName,
      });
    }

    return this.initPromise;
  }

  toTicket(document) {
    if (!document) {
      return null;
    }

    const ticket = document.toObject ? document.toObject() : document;
    delete ticket._id;
    return ticket;
  }

  async findAll(filters = {}) {
    await this.ensureInitialized();
    const query = filters.status ? { status: filters.status } : {};
    const documents = await this.Ticket.find(query).lean();
    return documents.map((document) => this.toTicket(document));
  }

  async findById(id) {
    await this.ensureInitialized();
    const document = await this.Ticket.findOne({ id }).lean();
    return this.toTicket(document);
  }

  async create(ticket) {
    await this.ensureInitialized();
    await this.Ticket.create(ticket);
    return ticket;
  }

  async update(id, ticket) {
    await this.ensureInitialized();
    const document = await this.Ticket.findOneAndUpdate({ id }, ticket, {
      new: true,
      runValidators: true,
    }).lean();

    return this.toTicket(document);
  }

  async delete(id) {
    await this.ensureInitialized();
    const result = await this.Ticket.deleteOne({ id });
    return result.deletedCount > 0;
  }
}

module.exports = MongooseTicketAdapter;
