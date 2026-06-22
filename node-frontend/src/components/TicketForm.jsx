import { useEffect, useState } from "react";
import { PRIORITIES, PRIORITY_LABELS, STATUSES, STATUS_LABELS } from "../constants.js";

const EMPTY_TICKET = {
  title: "",
  description: "",
  status: "OPEN",
  priority: "MEDIUM",
  assignee: "",
};

export default function TicketForm({ initialValue, submitting, onSubmit, onCancel }) {
  const [form, setForm] = useState(EMPTY_TICKET);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!initialValue) {
      setForm(EMPTY_TICKET);
      return;
    }

    setForm({
      title: initialValue.title || "",
      description: initialValue.description || "",
      status: initialValue.status || "OPEN",
      priority: initialValue.priority || "MEDIUM",
      assignee: initialValue.assignee || "",
    });
  }, [initialValue]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }

    setError("");
    onSubmit(form);
  }

  const isEditing = Boolean(initialValue);

  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      <div>
        <p className="eyebrow">{isEditing ? "Update request" : "New request"}</p>
        <h2>{isEditing ? "Edit ticket" : "Create ticket"}</h2>
      </div>

      <label>
        Title
        <input
          value={form.title}
          maxLength={200}
          onChange={(event) => updateField("title", event.target.value)}
          placeholder="Short issue summary"
        />
      </label>

      <label>
        Description
        <textarea
          value={form.description}
          maxLength={5000}
          rows={5}
          onChange={(event) => updateField("description", event.target.value)}
          placeholder="What happened? Who is affected?"
        />
      </label>

      <div className="form-row">
        <label>
          Status
          <select value={form.status} onChange={(event) => updateField("status", event.target.value)}>
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </label>

        <label>
          Priority
          <select value={form.priority} onChange={(event) => updateField("priority", event.target.value)}>
            {PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {PRIORITY_LABELS[priority]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        Assignee
        <input
          value={form.assignee}
          maxLength={120}
          onChange={(event) => updateField("assignee", event.target.value)}
          placeholder="e.g. alice"
        />
      </label>

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? "Saving..." : isEditing ? "Update ticket" : "Create ticket"}
        </button>

        {isEditing && (
          <button className="btn btn-ghost" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
