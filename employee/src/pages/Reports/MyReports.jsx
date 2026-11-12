import { useMemo, useState } from "react";
import { FileText, Clock, CheckCircle2, AlertCircle } from "lucide-react";

import ReportHistoryTable from "../../components/reports/ReportHistoryTable.jsx";
import ReportDetailsModal from "../../components/reports/ReportDetailsModal.jsx";

const initialReports = [
  {
    id: 1,
    reportNumber: "RPT-2026-001",
    title: "Monthly Work Progress Report",
    category: "Monthly Report",
    date: "2026-10-30",
    status: "Approved",
    description:
      "This report summarizes the activities completed during the month, project progress, achievements, and challenges.",
    remarks: "Report reviewed and approved.",
  },
  {
    id: 2,
    reportNumber: "RPT-2026-002",
    title: "IT Infrastructure Activities",
    category: "Technical Report",
    date: "2026-11-03",
    status: "Pending",
    description:
      "Summary of infrastructure maintenance, system monitoring, and technical support activities.",
    remarks: "Waiting for HR review.",
  },
  {
    id: 3,
    reportNumber: "RPT-2026-003",
    title: "Department Activity Report",
    category: "Activity Report",
    date: "2026-11-06",
    status: "Rejected",
    description:
      "Summary of department activities and completed assignments.",
    remarks: "Please provide more details about completed activities.",
  },
];

export default function MyReports() {
  const [reports] = useState(initialReports);
  const [selectedReport, setSelectedReport] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesSearch =
        report.title.toLowerCase().includes(search.toLowerCase()) ||
        report.reportNumber.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || report.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [reports, search, statusFilter]);

  const approved = reports.filter((item) => item.status === "Approved").length;
  const pending = reports.filter((item) => item.status === "Pending").length;
  const rejected = reports.filter((item) => item.status === "Rejected").length;

  return (
    <div className="employee-module-page">
      <div className="module-page-heading">
        <div>
          <span className="module-eyebrow">EMPLOYEE SERVICES</span>
          <h1>My Reports</h1>
          <p>View and track the reports you have submitted.</p>
        </div>
      </div>

      <div className="module-stats-grid">
        <div className="module-stat-card">
          <div className="module-stat-icon blue"><FileText /></div>
          <div><span>Total Reports</span><h2>{reports.length}</h2></div>
        </div>

        <div className="module-stat-card">
          <div className="module-stat-icon orange"><Clock /></div>
          <div><span>Pending</span><h2>{pending}</h2></div>
        </div>

        <div className="module-stat-card">
          <div className="module-stat-icon green"><CheckCircle2 /></div>
          <div><span>Approved</span><h2>{approved}</h2></div>
        </div>

        <div className="module-stat-card">
          <div className="module-stat-icon red"><AlertCircle /></div>
          <div><span>Rejected</span><h2>{rejected}</h2></div>
        </div>
      </div>

      <div className="module-content-card">
        <div className="module-section-heading module-filter-heading">
          <div>
            <h2>Report History</h2>
            <p>Your submitted report records and their current status.</p>
          </div>

          <div className="module-filters">
            <input
              type="search"
              placeholder="Search reports..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <ReportHistoryTable
          reports={filteredReports}
          onView={setSelectedReport}
        />
      </div>

      {selectedReport && (
        <ReportDetailsModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
}