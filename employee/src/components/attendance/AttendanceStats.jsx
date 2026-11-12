import {
  CalendarCheck,
  Clock3,
  TrendingUp,
} from "lucide-react";

export default function AttendanceStats({ records }) {
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

  const stats = [
    {
      title: "Present Days",
      value: presentDays,
      description: "Recorded attendance",
      icon: CalendarCheck,
      color: "green",
    },
    {
      title: "Late Days",
      value: lateDays,
      description: "Late arrivals",
      icon: Clock3,
      color: "orange",
    },
    {
      title: "Attendance Rate",
      value: `${attendanceRate}%`,
      description: "Based on available records",
      icon: TrendingUp,
      color: "blue",
    },
  ];

  return (
    <div className="attendance-stats-grid">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article className="attendance-stat-card" key={stat.title}>
            <div className={`attendance-stat-icon ${stat.color}`}>
              <Icon size={22} />
            </div>

            <div>
              <p>{stat.title}</p>
              <h3>{stat.value}</h3>
              <span>{stat.description}</span>
            </div>
          </article>
        );
      })}
    </div>
  );
}