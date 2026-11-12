import { Eye, FileText } from "lucide-react";

export default function ReportHistoryTable({ reports = [], onView }) {
  if (reports.length === 0) {
    return (
      <div className="module-empty-state">
        <FileText size={38} />
        <h3>No reports found</h3>
        <p>Your submitted reports will appear here.</p>
      </div>
    );
  }

  return (
    <div className="module-table-wrapper">
      <table className="module-table">
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Report Title</th>
            <th>Category</th>
            <th>Submission Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.reportNumber}</td>
              <td className="module-table-title">{report.title}</td>
              <td>{report.category}</td>
              <td>{report.date}</td>
              <td>
                <span
                  className={`module-status ${report.status.toLowerCase()}`}
                >
                  {report.status}
                </span>
              </td>
              <td>
                <button
                  className="module-view-button"
                  onClick={() => onView?.(report)}
                  title="View report details"
                >
                  <Eye size={16} />
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}