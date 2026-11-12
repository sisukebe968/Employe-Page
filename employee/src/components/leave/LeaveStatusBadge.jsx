
export default function LeaveStatusBadge({ status }) {
  const statusClass = status?.toLowerCase() || "pending";

  return (
    <span className={`leave-status ${statusClass}`}>
      {status || "Pending"}
    </span>
  );
}
