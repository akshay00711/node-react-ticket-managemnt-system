import { STATUSES, STATUS_LABELS } from "../constants.js";

export default function TicketFilters({ activeStatus, counts, onChange, onRefresh }) {
  return (
    <div className="toolbar">
      <div className="filters">
        <button className={`chip ${activeStatus === "" ? "active" : ""}`} onClick={() => onChange("")}>
          All ({counts.ALL || 0})
        </button>

        {STATUSES.map((status) => (
          <button
            key={status}
            className={`chip ${activeStatus === status ? "active" : ""}`}
            onClick={() => onChange(status)}
          >
            {STATUS_LABELS[status]} ({counts[status] || 0})
          </button>
        ))}
      </div>

      <button className="btn btn-ghost" onClick={onRefresh}>
        Refresh
      </button>
    </div>
  );
}
