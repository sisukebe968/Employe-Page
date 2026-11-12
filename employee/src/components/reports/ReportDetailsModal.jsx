import { X, FileText, CalendarDays, UserRound, Tag } from "lucide-react";

export default function ReportDetailsModal({ report, onClose }) {
  if (!report) return null;

  return (
    <div className="module-modal-overlay" onClick={onClose}>
      <div
        className="module-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="module-modal-header">
          <div>
            <h2>Report Details</h2>
            <p>{report.reportNumber}</p>
          </div>

          <button className="module-icon-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="module-modal-body">
          <div className="report-detail-item">
            <span><FileText size={17} /> Report title</span>
            <strong>{report.title}</strong>
          </div>

          <div className="report-detail-item">
            <span><Tag size={17} /> Category</span>
            <strong>{report.category}</strong>
          </div>

          <div className="report-detail-item">
            <span><CalendarDays size={17} /> Submission date</span>
            <strong>{report.date}</strong>
          </div>

          <div className="report-detail-item">
            <span><UserRound size={17} /> Submitted by</span>
            <strong>{report.submittedBy || "Tiblet Alemayehu"}</strong>
          </div>

          <div className="report-detail-description">
            <h4>Description</h4>
            <p>{report.description}</p>
          </div>

          {report.remarks && (
            <div className="report-detail-description">
              <h4>HR Remarks</h4>
              <p>{report.remarks}</p>
            </div>
          )}

          <div className="report-detail-item">
            <span>Status</span>
            <strong className={`module-status ${report.status.toLowerCase()}`}>
              {report.status}
            </strong>
          </div>
        </div>

        <div className="module-modal-footer">
          <button className="module-secondary-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}