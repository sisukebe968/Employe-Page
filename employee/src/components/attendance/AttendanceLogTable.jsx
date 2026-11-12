import { Clock3, Download } from "lucide-react";

export default function AttendanceLogTable({ records }) {
  const getStatusClass = (status) => {
    if (status === "PRESENT") return "present";
    if (status === "LATE") return "late";
    if (status === "ABSENT") return "absent";
    return "pending";
  };

  const downloadCSV = () => {
    const headings = [
      "Date",
      "Check In",
      "Check Out",
      "Status",
      "IP Address",
    ];

    const rows = records.map((record) => [
      record.date,
      record.checkIn || "-",
      record.checkOut || "-",
      record.status,
      record.ipAddress || "-",
    ]);

    const csv = [headings, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "attendance-history.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <section className="attendance-panel">
      <div className="attendance-panel-header">
        <div>
          <h3>Recent Attendance History</h3>
          <p>Your recent check-in and check-out records</p>
        </div>

        <button
          type="button"
          className="attendance-export-button"
          onClick={downloadCSV}
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <div className="attendance-table-wrapper">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Status</th>
              <th>IP Address</th>
            </tr>
          </thead>

          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan="5" className="attendance-empty">
                  <Clock3 size={25} />
                  <span>No attendance records available.</span>
                </td>
              </tr>
            ) : (
              records.map((record) => (
                <tr key={record.id}>
                  <td>{record.date}</td>
                  <td>{record.checkIn || "--:--"}</td>
                  <td>{record.checkOut || "--:--"}</td>
                  <td>
                    <span
                      className={`attendance-status-badge ${getStatusClass(
                        record.status
                      )}`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="attendance-ip">
                    {record.ipAddress || "Not available"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}