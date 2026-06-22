const { randomUUID } = require("crypto");
const ApiError = require("../utils/ApiError");
const { TICKET_PRIORITIES, TICKET_STATUSES } = require("../config/ticket.constants");

function normalizeEnum(value, fallback) {
  if (!value) {
    return fallback;
  }

  return String(value).trim().toUpperCase().replace(/\s+/g, "_");
}

function validateTicketPayload(payload, { partial = false } = {}) {
  const errors = [];

  if (!partial || Object.prototype.hasOwnProperty.call(payload, "title")) {
    if (!payload.title || !String(payload.title).trim()) {
      errors.push("Title is required.");
    } else if (String(payload.title).length > 200) {
      errors.push("Title must be 200 characters or fewer.");
    }
  }

  if (payload.description && String(payload.description).length > 5000) {
    errors.push("Description must be 5000 characters or fewer.");
  }

  const status = normalizeEnum(payload.status, "OPEN");
  if (payload.status && !TICKET_STATUSES.includes(status)) {
    errors.push(`Status must be one of: ${TICKET_STATUSES.join(", ")}.`);
  }

  const priority = normalizeEnum(payload.priority, "MEDIUM");
  if (payload.priority && !TICKET_PRIORITIES.includes(priority)) {
    errors.push(`Priority must be one of: ${TICKET_PRIORITIES.join(", ")}.`);
  }

  if (payload.assignee && String(payload.assignee).length > 120) {
    errors.push("Assignee must be 120 characters or fewer.");
  }

  if (errors.length > 0) {
    throw new ApiError(400, "Ticket validation failed.", errors);
  }
}

function createTicket(payload) {
  validateTicketPayload(payload);

  const now = new Date().toISOString();

  return {
    id: randomUUID(),
    title: String(payload.title).trim(),
    description: payload.description ? String(payload.description).trim() : "",
    status: normalizeEnum(payload.status, "OPEN"),
    priority: normalizeEnum(payload.priority, "MEDIUM"),
    assignee: payload.assignee ? String(payload.assignee).trim() : "",
    createdAt: now,
    updatedAt: now,
  };
}

function applyTicketUpdates(existingTicket, payload) {
  validateTicketPayload(payload, { partial: true });

  return {
    ...existingTicket,
    title: payload.title !== undefined ? String(payload.title).trim() : existingTicket.title,
    description:
      payload.description !== undefined
        ? String(payload.description).trim()
        : existingTicket.description,
    status: payload.status !== undefined ? normalizeEnum(payload.status, "OPEN") : existingTicket.status,
    priority:
      payload.priority !== undefined
        ? normalizeEnum(payload.priority, "MEDIUM")
        : existingTicket.priority,
    assignee: payload.assignee !== undefined ? String(payload.assignee).trim() : existingTicket.assignee,
    updatedAt: new Date().toISOString(),
  };
}

module.exports = {
  createTicket,
  applyTicketUpdates,
  validateTicketPayload,
};
