const ApiError = require("../utils/ApiError");
const { applyTicketUpdates, createTicket } = require("../models/ticket.model");

class TicketService {
  constructor(ticketRepository) {
    this.ticketRepository = ticketRepository;
  }

  async findAll(filters = {}) {
    return this.ticketRepository.findAll(filters);
  }

  async findById(id) {
    const ticket = await this.ticketRepository.findById(id);
    if (!ticket) {
      throw new ApiError(404, `Ticket with id "${id}" was not found.`);
    }

    return ticket;
  }

  async create(payload) {
    const ticket = createTicket(payload);
    return this.ticketRepository.create(ticket);
  }

  async update(id, payload) {
    const existingTicket = await this.findById(id);
    const nextTicket = applyTicketUpdates(existingTicket, payload);
    return this.ticketRepository.update(id, nextTicket);
  }

  async delete(id) {
    const deleted = await this.ticketRepository.delete(id);
    if (!deleted) {
      throw new ApiError(404, `Ticket with id "${id}" was not found.`);
    }
  }
}

module.exports = TicketService;
