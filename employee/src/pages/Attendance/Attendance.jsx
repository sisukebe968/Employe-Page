
import { useState } from "react";
import { Clock, LogIn, LogOut, CalendarDays } from "lucide-react";

export default function Attendance() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getTime = () =>
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  return (
    <div className="employee-content attendance-page">
      <h1>Attendance Management</h1>
      <p>Manage your daily attendance records.</p>

      <section className="attendance-timecard">
        <h2>
          <CalendarDays size={20} /> {today}
        </h2>

        <h3>
          {checkOut
            ? "Workday Completed"
            : checkIn
            ? "You Are Checked In"
            : "Not Yet Checked In"}
        </h3>

        <p>Check-in: {checkIn || "Not recorded"}</p>
        <p>Check-out: {checkOut || "Not recorded"}</p>

        <button
          type="button"
          disabled={Boolean(checkIn)}
          onClick={() => setCheckIn(getTime())}
        >
          <LogIn size={18} /> Check In
        </button>

        <button
          type="button"
          disabled={!checkIn || Boolean(checkOut)}
          onClick={() => setCheckOut(getTime())}
        >
          <LogOut size={18} /> Check Out
        </button>
      </section>

      <p>
        <Clock size={16} /> Attendance demo mode
      </p>
    </div>
  );
}
