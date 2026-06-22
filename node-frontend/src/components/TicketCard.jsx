import { PRIORITY_LABELS, STATUS_LABELS } from "../constants.js";

function formatDate(value) {
  if (!value) {
    return "Unknown";
  }

  return new Date(value).toLocaleString();
}

export default function TicketCard({ ticket, onEdit, onDelete, onView }) {
  return (
    <article className="ticket-card">
      <div className="ticket-card-header">
        <span className={`badge priority-${ticket.priority?.toLowerCase()}`}>
          {PRIORITY_LABELS[ticket.priority] || ticket.priority}
        </span>
        <span className={`badge status-${ticket.status?.toLowerCase()}`}>
          {STATUS_LABELS[ticket.status] || ticket.status}
        </span>
      </div>

      <h3>{ticket.title}</h3>
      {ticket.description && <p className="ticket-description">{ticket.description}</p>}

      <dl className="ticket-details">
        <div>
          <dt>Assignee</dt>
          <dd>{ticket.assignee || "Unassigned"}</dd>
        </div>
        <div>
          <dt>Ticket ID</dt>
          <dd>{ticket.id}</dd>
        </div>
        <div>
          <dt>Created</dt>
          <dd>{formatDate(ticket.createdAt)}</dd>
        </div>
        <div>
          <dt>Updated</dt>
          <dd>{formatDate(ticket.updatedAt)}</dd>
        </div>
      </dl>

      <div className="ticket-card-actions">
        <button className="btn btn-small" onClick={() => onView(ticket.id)}>
          View
        </button>
        <button className="btn btn-small" onClick={() => onEdit(ticket)}>
          Edit
        </button>
        <button className="btn btn-small btn-danger" onClick={() => onDelete(ticket)}>
          Delete
        </button>
      </div>
    </article>
  );
}
