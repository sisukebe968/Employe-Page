import {
  Clock3,
  LogIn,
  LogOut,
  ShieldCheck,
} from "lucide-react";

export default function CheckInOutWidget({
  status,
  checkIn,
  checkOut,
  currentTime,
  currentDate,
}) {
  const checkedIn = status === "checked-in";
  const checkedOut = status === "checked-out";

  return (
    <section className="attendance-timecard">
      <div className="attendance-timecard-info">
        <div className="attendance-date-label">
          <Clock3 size={19} />
          <span>TODAY'S TIMECARD — {currentDate}</span>
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
            Checked in at {checkIn}
          </div>
        )}

        {checkedOut && (
          <div className="attendance-current-status">
            <ShieldCheck size={16} />
            Completed at {checkOut}
          </div>
        )}
      </div>

      <div className="attendance-live-clock">
        <span>LOCAL TIME</span>
        <strong>{currentTime}</strong>
      </div>

      <div className="attendance-timecard-actions">
        <button
          type="button"
          className="attendance-checkin-button"
          onClick={checkIn}
          disabled={checkedIn || checkedOut}
        >
          <LogIn size={20} />
          CHECK IN
        </button>

        <button
          type="button"
          className="attendance-checkout-button"
          onClick={checkOut}
          disabled={!checkedIn || checkedOut}
        >
          <LogOut size={20} />
          CHECK OUT
        </button>
      </div>
    </section>
  );
}