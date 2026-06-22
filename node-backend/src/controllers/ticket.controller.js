class TicketController {
  constructor(ticketService) {
    this.ticketService = ticketService;
  }

  getAll = async (req, res, next) => {
    try {
      const status = req.query.status ? String(req.query.status).toUpperCase() : undefined;
      const tickets = await this.ticketService.findAll({ status });
      res.json(tickets);
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req, res, next) => {
    try {
      const ticket = await this.ticketService.findById(req.params.id);
      res.json(ticket);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const ticket = await this.ticketService.create(req.body);
      res.status(201).json(ticket);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const ticket = await this.ticketService.update(req.params.id, req.body);
      res.json(ticket);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      await this.ticketService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = TicketController;
