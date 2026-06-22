const express = require("express");
const TicketController = require("../controllers/ticket.controller");
const createTicketRepository = require("../repositories/ticketRepository.factory");
const TicketService = require("../services/ticket.service");

const router = express.Router();
const ticketRepository = createTicketRepository();
const ticketService = new TicketService(ticketRepository);
const ticketController = new TicketController(ticketService);

router.get("/", ticketController.getAll);
router.get("/:id", ticketController.getOne);
router.post("/", ticketController.create);
router.put("/:id", ticketController.update);
router.delete("/:id", ticketController.delete);

module.exports = router;
