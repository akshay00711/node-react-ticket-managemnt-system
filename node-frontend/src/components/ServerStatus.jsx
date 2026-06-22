export default function ServerStatus({ status, message }) {
  const label = status === "online" ? "Backend online" : status === "checking" ? "Checking backend" : "Backend offline";

  return (
    <div className={`server-status server-${status}`}>
      <span className="status-dot" />
      <div>
        <strong>{label}</strong>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
