
import { useEffect, useState } from "react";
import {
  Clock3,
  LogIn,
  LogOut,
  CalendarDays,
  CheckCircle2,
  TrendingUp,
  Timer,
  Download,
} from "lucide-react";

const getDateKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatTime = (date) =>
  date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

const formatDate = (date) =>
  date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const demoRecords = [
  {
    id: 1,
    dateKey: "2026-11-03",
    date: "Tue, Nov 3, 2026",
    checkIn: "08:25 AM",
    checkOut: "05:30 PM",
    status: "PRESENT",
    ipAddress: "::1",
  },
  {
    id: 2,
    dateKey: "2026-11-02",
    date: "Mon, Nov 2, 2026",
    checkIn: "08:56 AM",
    checkOut: "05:30 PM",
    status: "LATE",
    ipAddress: "::1",
  },
  {
    id: 3,
    dateKey: "2026-10-30",
    date: "Fri, Oct 30, 2026",
    checkIn: "08:26 AM",
    checkOut: "05:30 PM",
    status: "PRESENT",
    ipAddress: "::1",
  },
];

export default function Attendance() {
  const [records, setRecords] = useState(demoRecords);
  const [now, setNow] = useState(new Date());
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const todayKey = getDateKey(now);

  const todayRecord = records.find(
    (record) => record.dateKey === todayKey
  );

  const checkedIn = Boolean(todayRecord?.checkIn);
  const checkedOut = Boolean(todayRecord?.checkOut);

  const handleCheckIn = () => {
    if (checkedIn) return;

    const current = new Date();
    const time = formatTime(current);

    const newRecord = {
      id: Date.now(),
      dateKey: todayKey,
      date: current.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      checkIn: time,
      checkOut: "",
      status:
        current.getHours() > 8 ||
        (current.getHours() === 8 && current.getMinutes() > 30)
          ? "LATE"
          : "PRESENT",
      ipAddress: "Local demo",
    };

    setRecords((previous) => [newRecord, ...previous]);
    setMessage(`Successfully checked in at ${time}.`);
  };

  const handleCheckOut = () => {
    if (!checkedIn || checkedOut) return;

    const time = formatTime(new Date());

    setRecords((previous) =>
      previous.map((record) =>
        record.dateKey === todayKey
          ? { ...record, checkOut: time }
          : record
      )
    );

    setMessage(`Successfully checked out at ${time}.`);
  };

  const presentDays = records.filter(
    (record) => record.status === "PRESENT"
  ).length;

  const lateDays = records.filter(
    (record) => record.status === "LATE"
  ).length;

  const attendanceRate =
    records.length > 0
      ? Math.round((presentDays / records.length) * 100)
      : 0;

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
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
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
    <div className="employee-content attendance-page">
      {/* PAGE HEADING */}
      <div className="attendance-page-heading">
        <div>
          <span className="attendance-eyebrow">
            EMPLOYEE SELF SERVICE
          </span>

          <h1>Attendance Check-In & Check-Out</h1>

          <p>
            Electronic daily presence recording with system timestamp
            and IP verification.
          </p>
        </div>
      </div>

      {/* SUCCESS MESSAGE */}
      {message && (
        <div className="attendance-success-message">
          <CheckCircle2 size={18} />
          <span>{message}</span>

          <button
            type="button"
            onClick={() => setMessage("")}
          >
            ×
          </button>
        </div>
      )}

      {/* TIME CARD */}
      <section className="attendance-timecard">
        <div className="attendance-timecard-info">
          <div className="attendance-date-label">
            <Clock3 size={19} />
            TODAY'S TIMECARD — {formatDate(now).toUpperCase()}
          </div>

          <h2>
            {checkedOut
              ? "Your Workday Is Complete"
              : checkedIn
              ? "You Are Checked In Today"
              : "Not Yet Checked In Today"}
          </h2>

          <p>
            Standard shift: 08:30 AM to 05:30 PM.
            Check-in and check-out are limited to once per workday.
          </p>

          {checkedIn && (
            <div className="attendance-current-status">
              <span className="attendance-status-dot" />
              Checked in at {todayRecord.checkIn}
            </div>
          )}

          {checkedOut && (
            <div className="attendance-current-status">
              <CheckCircle2 size={16} />
              Checked out at {todayRecord.checkOut}
            </div>
          )}
        </div>

        <div className="attendance-live-clock">
          <span>LOCAL TIME</span>
          <strong>{formatTime(now)}</strong>
        </div>

        <div className="attendance-timecard-actions">
          <button
            type="button"
            className="attendance-checkin-button"
            onClick={handleCheckIn}
            disabled={checkedIn}
          >
            <LogIn size={20} />
            CHECK IN
          </button>

          <button
            type="button"
            className="attendance-checkout-button"
            onClick={handleCheckOut}
            disabled={!checkedIn || checkedOut}
          >
            <LogOut size={20} />
            CHECK OUT
          </button>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="attendance-stats-grid">
        <div className="attendance-stat-card">
          <div className="attendance-stat-icon green">
            <CalendarDays size={23} />
          </div>

          <div>
            <p>Present Days</p>
            <h3>{presentDays}</h3>
            <span>Recorded attendance</span>
          </div>
        </div>

        <div className="attendance-stat-card">
          <div className="attendance-stat-icon orange">
            <Timer size={23} />
          </div>

          <div>
            <p>Late Days</p>
            <h3>{lateDays}</h3>
            <span>Late arrivals</span>
          </div>
        </div>

        <div className="attendance-stat-card">
          <div className="attendance-stat-icon blue">
            <TrendingUp size={23} />
          </div>

          <div>
            <p>Attendance Rate</p>
            <h3>{attendanceRate}%</h3>
            <span>Based on available records</span>
          </div>
        </div>
      </section>

      {/* ATTENDANCE HISTORY */}
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
              {records.map((record) => (
                <tr key={record.id}>
                  <td>{record.date}</td>
                  <td>{record.checkIn || "--:--"}</td>
                  <td>{record.checkOut || "--:--"}</td>

                  <td>
                    <span
                      className={`attendance-status-badge ${record.status.toLowerCase()}`}
                    >
                      {record.status}
                    </span>
                  </td>

                  <td className="attendance-ip">
                    {record.ipAddress}
                  </td>
                </tr>
              ))}

              {records.length === 0 && (
                <tr>
                  <td colSpan="5" className="attendance-empty">
                    No attendance records available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* DEMO NOTICE */}
      <div className="attendance-demo-note">
        <strong>Demo mode:</strong> Attendance records are currently
        stored in React state only. Backend database storage and
        organization IP verification are not connected yet.
      </div>
    </div>
  );
}
