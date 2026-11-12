
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
} from "lucide-react";

export default function LeaveBalanceSummery({ requests = [] }) {
  const pending = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  const approved = requests.filter(
    (request) => request.status === "Approved"
  ).length;

  const rejected = requests.filter(
    (request) => request.status === "Rejected"
  ).length;

  const approvedAnnualDays = requests
    .filter(
      (request) =>
        request.status === "Approved" &&
        request.leaveType === "Annual Leave"
    )
    .reduce((total, request) => total + request.totalDays, 0);

  const annualBalance = Math.max(0, 16 - approvedAnnualDays);

  const cards = [
    {
      title: "Annual Leave Balance",
      value: `${annualBalance} Days`,
      icon: CalendarDays,
      color: "total",
    },
    {
      title: "Total Requests",
      value: requests.length,
      icon: FileText,
      color: "total",
    },
    {
      title: "Pending",
      value: pending,
      icon: Clock,
      color: "pending",
    },
    {
      title: "Approved",
      value: approved,
      icon: CheckCircle2,
      color: "approved",
    },
    {
      title: "Rejected",
      value: rejected,
      icon: XCircle,
      color: "rejected",
    },
  ];

  return (
    <div className="leave-stats">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div className="leave-stat-card" key={card.title}>
            <div className={`leave-stat-icon ${card.color}`}>
              <Icon size={22} />
            </div>

            <div>
              <p>{card.title}</p>
              <h3>{card.value}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
