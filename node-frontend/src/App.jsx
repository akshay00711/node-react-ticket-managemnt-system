import { useEffect, useMemo, useState } from "react";
import {
  createTicket,
  deleteTicket,
  getServerHealth,
  getTicketById,
  getTickets,
  updateTicket,
} from "./api/ticketApi.js";
import ServerStatus from "./components/ServerStatus.jsx";
import TicketCard from "./components/TicketCard.jsx";
import TicketFilters from "./components/TicketFilters.jsx";
import TicketForm from "./components/TicketForm.jsx";
import { PRIORITY_LABELS, STATUSES, STATUS_LABELS } from "./constants.js";

function formatDate(value) {
  if (!value) {
    return "Unknown";
  }

  return new Date(value).toLocaleString();
}

export default function App() {
  const [tickets, setTickets] = useState([]);
  const [allTickets, setAllTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [editingTicket, setEditingTicket] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [serverStatus, setServerStatus] = useState({
    status: "checking",
    message: "Connecting to the Node backend...",
  });

  async function checkHealth() {
    setServerStatus({ status: "checking", message: "Checking /health..." });

    try {
      const health = await getServerHealth();
      setServerStatus({
        status: "online",
        message: `${health.service || "Ticketing API"} is ready.`,
      });
    } catch (healthError) {
      setServerStatus({
        status: "offline",
        message: healthError.message,
      });
    }
  }

  async function loadTickets(nextStatus = statusFilter) {
    setLoading(true);
    setError("");

    try {
      const allData = await getTickets();
      const visibleData = nextStatus ? await getTickets(nextStatus) : allData;
      setAllTickets(allData);
      setTickets(visibleData);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkHealth();
    loadTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadTickets(statusFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  async function handleSubmit(form) {
    setSubmitting(true);
    setError("");

    try {
      if (editingTicket) {
        await updateTicket(editingTicket.id, form);
      } else {
        await createTicket(form);
      }

      setEditingTicket(null);
      await loadTickets();
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(ticket) {
    if (!window.confirm(`Delete ticket "${ticket.title}"?`)) {
      return;
    }

    setError("");

    try {
      await deleteTicket(ticket.id);
      if (editingTicket?.id === ticket.id) {
        setEditingTicket(null);
      }
      if (selectedTicket?.id === ticket.id) {
        setSelectedTicket(null);
      }
      await loadTickets();
    } catch (deleteError) {
      setError(deleteError.message);
    }
  }

  async function handleView(id) {
    setError("");

    try {
      const ticket = await getTicketById(id);
      setSelectedTicket(ticket);
    } catch (viewError) {
      setError(viewError.message);
    }
  }

  const counts = useMemo(() => {
    const nextCounts = { ALL: allTickets.length };
    for (const status of STATUSES) {
      nextCounts[status] = allTickets.filter((ticket) => ticket.status === status).length;
    }
    return nextCounts;
  }, [allTickets]);

  return (
    <div className="app">
      <header className="hero">
        <div>
          <p className="eyebrow">React + Node.js MVC</p>
          <h1>Customer Ticketing System</h1>
          <p>Create, update, delete, filter, and inspect support tickets from one dashboard.</p>
        </div>
        <ServerStatus status={serverStatus.status} message={serverStatus.message} />
      </header>

      <main className="layout">
        <aside className="sidebar">
          <TicketForm
            initialValue={editingTicket}
            submitting={submitting}
            onSubmit={handleSubmit}
            onCancel={() => setEditingTicket(null)}
          />
        </aside>

        <section className="content">
          <TicketFilters
            activeStatus={statusFilter}
            counts={counts}
            onChange={setStatusFilter}
            onRefresh={() => {
              checkHealth();
              loadTickets();
            }}
          />

          {error && <p className="banner banner-error">{error}</p>}

          {selectedTicket && (
            <div className="selected-ticket-panel">
              <div className="selected-ticket-header">
                <div>
                  <p className="eyebrow">Ticket details</p>
                  <h2>{selectedTicket.title}</h2>
                </div>
                <button className="btn btn-small" onClick={() => setSelectedTicket(null)}>
                  Close
                </button>
              </div>

              {selectedTicket.description && (
                <p className="selected-ticket-description">{selectedTicket.description}</p>
              )}

              <div className="selected-ticket-meta">
                <span className={`badge priority-${selectedTicket.priority?.toLowerCase()}`}>
                  {PRIORITY_LABELS[selectedTicket.priority] || selectedTicket.priority}
                </span>
                <span className={`badge status-${selectedTicket.status?.toLowerCase()}`}>
                  {STATUS_LABELS[selectedTicket.status] || selectedTicket.status}
                </span>
                <span>Assignee: {selectedTicket.assignee || "Unassigned"}</span>
                <span>ID: {selectedTicket.id}</span>
                <span>Created: {formatDate(selectedTicket.createdAt)}</span>
                <span>Updated: {formatDate(selectedTicket.updatedAt)}</span>
              </div>
            </div>
          )}

          {loading ? (
            <p className="empty-state">Loading tickets...</p>
          ) : tickets.length === 0 ? (
            <p className="empty-state">No tickets found. Create one to get started.</p>
          ) : (
            <div className="ticket-grid">
              {tickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onEdit={setEditingTicket}
                  onDelete={handleDelete}
                  onView={handleView}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
 