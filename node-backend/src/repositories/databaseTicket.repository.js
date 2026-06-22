class DatabaseTicketRepository {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async findAll(filters = {}) {
    return this.adapter.findAll(filters);
  }

  async findById(id) {
    return this.adapter.findById(id);
  }

  async create(ticket) {
    return this.adapter.create(ticket);
  }

  async update(id, ticket) {
    return this.adapter.update(id, ticket);
  }

  async delete(id) {
    return this.adapter.delete(id);
  }
}

module.exports = DatabaseTicketRepository;
