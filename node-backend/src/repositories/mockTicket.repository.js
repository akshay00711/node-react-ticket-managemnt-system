const mockTickets = require("../mocks/tickets.mock");

class MockTicketRepository {
  constructor() {
    this.tickets = mockTickets.map((ticket) => ({ ...ticket }));
  }

  async findAll(filters = {}) {
    const { status } = filters;
    return this.tickets.filter((ticket) => !status || ticket.status === status);
  }

  async findById(id) {
    return this.tickets.find((ticket) => ticket.id === id) || null;
  }

  async create(ticket) {
    this.tickets.push(ticket);
    return ticket;
  }

  async update(id, ticket) {
    const index = this.tickets.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }

    this.tickets[index] = ticket;
    return this.tickets[index];
  }

  async delete(id) {
    const initialLength = this.tickets.length;
    this.tickets = this.tickets.filter((ticket) => ticket.id !== id);
    return this.tickets.length < initialLength;
  }
}

module.exports = MockTicketRepository;
