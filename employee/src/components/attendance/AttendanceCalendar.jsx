import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from "lucide-react";

export default function AttendanceCalendar({ records }) {
  const [monthDate, setMonthDate] = useState(new Date());

  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();

  const monthName = monthDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    return [
      ...Array(firstDay).fill(null),
      ...Array.from({ length: totalDays }, (_, index) => index + 1),
    ];
  }, [year, month]);

  const getDayStatus = (day) => {
    if (!day) return "";

    const date = new Date(year, month, day);

    const dateKey = [
      year,
      String(month + 1).padStart(2, "0"),
      String(day).padStart(2, "0"),
    ].join("-");

    const record = records.find(
      (item) => item.dateKey === dateKey
    );

    if (record) return record.status.toLowerCase();

    if (date.getDay() === 0 || date.getDay() === 6) {
      return "weekend";
    }

    if (date < new Date(new Date().setHours(0, 0, 0, 0))) {
      return "unrecorded";
    }

    return "";
  };

  const changeMonth = (amount) => {
    setMonthDate(
      new Date(year, month + amount, 1)
    );
  };

  return (
    <section className="attendance-panel attendance-calendar-panel">
      <div className="attendance-panel-header">
        <div>
          <h3>
            <CalendarDays size={19} />
            Attendance Calendar
          </h3>
          <p>Monthly attendance overview</p>
        </div>

        <div className="attendance-calendar-controls">
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>

          <strong>{monthName}</strong>

          <button
            type="button"
            onClick={() => changeMonth(1)}
            aria-label="Next month"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="attendance-calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
          (day) => (
            <div className="attendance-calendar-weekday" key={day}>
              {day}
            </div>
          )
        )}

        {calendarDays.map((day, index) => {
          const status = getDayStatus(day);

          return (
            <div
              key={`${year}-${month}-${index}`}
              className={`attendance-calendar-day ${status}`}
            >
              {day || ""}
            </div>
          );
        })}
      </div>

      <div className="attendance-calendar-legend">
        <span><i className="present" /> Present</span>
        <span><i className="late" /> Late</span>
        <span><i className="weekend" /> Weekend</span>
        <span><i className="unrecorded" /> No record</span>
      </div>
    </section>
  );
}