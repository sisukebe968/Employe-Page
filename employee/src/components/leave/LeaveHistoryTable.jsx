
import { FileText } from "lucide-react";
import LeaveStatusBadge from "./LeaveStatusBadge.jsx";

export default function LeaveHistoryTable({ requests = [], onApply }) {
  return (
    <div className="leave-panel">
      <div className="leave-panel-heading">
        <div>
          <h3>Leave History</h3>
          <p>View your submitted leave applications</p>
        </div>
      </div>

      {requests.length === 0 ? (
        <div className="leave-empty">
          <div className="leave-empty-icon">
            <FileText size={28} />
          </div>
          <h3>No leave requests yet</h3>
          <p>Your leave applications will appear here.</p>
          <button
            type="button"
            className="leave-primary-button"
            onClick={onApply}
          >
            Apply for Leave
          </button>
        </div>
      ) : (
        <div className="leave-table-wrapper">
          <table className="leave-table">
            <thead>
              <tr>
                <th>Application No.</th>
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Total Days</th>
                <th>Submitted</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((request) => (
                <tr key={request.id}>
                  <td>{request.applicationNumber}</td>
                  <td>{request.leaveType}</td>
                  <td>{request.startDate}</td>
                  <td>{request.endDate}</td>
                  <td>{request.totalDays} Days</td>
                  <td>{request.submittedAt}</td>
                  <td>
                    <LeaveStatusBadge status={request.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
