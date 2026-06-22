function toTicket(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    status: row.status,
    priority: row.priority,
    assignee: row.assignee,
    createdAt: row.created_at || row.createdAt,
    updatedAt: row.updated_at || row.updatedAt,
  };
}

function toRow(ticket) {
  return {
    id: ticket.id,
    title: ticket.title,
    description: ticket.description,
    status: ticket.status,
    priority: ticket.priority,
    assignee: ticket.assignee,
    created_at: ticket.createdAt || ticket.created_at,
    updated_at: ticket.updatedAt || ticket.updated_at,
  };
}

module.exports = {
  toTicket,
  toRow,
};
