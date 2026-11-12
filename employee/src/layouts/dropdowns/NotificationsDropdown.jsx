
import {
  CalendarDays,
  FileText,
  CheckCircle2,
  X,
  Bell,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "Leave Request Update",
    message: "Check your leave page for the latest request information.",
    time: "Recently",
    icon: CalendarDays,
    color: "green",
  },
  {
    id: 2,
    title: "Payroll Information",
    message: "Your payroll information is available in My Payroll.",
    time: "Recently",
    icon: FileText,
    color: "blue",
  },
  {
    id: 3,
    title: "Welcome to HADIYA HRMS",
    message: "Welcome to your employee portal.",
    time: "Recently",
    icon: CheckCircle2,
    color: "purple",
  },
];

export default function NotificationsDropdown({
  onViewAll,
  onClose,
}) {
  return (
    <div
      className="employee-notifications-dropdown"
      role="dialog"
      aria-label="Notifications"
    >
      <div className="employee-dropdown-header">
        <div>
          <h3>Notifications</h3>
          <p>Recent employee updates</p>
        </div>

        <button
          type="button"
          className="employee-dropdown-close"
          onClick={onClose}
          aria-label="Close notifications"
        >
          <X size={18} />
        </button>
      </div>

      <div className="employee-notification-list">
        {notifications.length > 0 ? (
          notifications.map((notification) => {
            const Icon = notification.icon;

            return (
              <div
                className="employee-notification-item"
                key={notification.id}
              >
                <div
                  className={`employee-notification-icon ${notification.color}`}
                >
                  <Icon size={19} />
                </div>

                <div className="employee-notification-content">
                  <h4>{notification.title}</h4>
                  <p>{notification.message}</p>
                  <small>{notification.time}</small>
                </div>
              </div>
            );
          })
        ) : (
          <div className="employee-notifications-empty">
            <Bell size={28} />
            <p>No notifications available.</p>
          </div>
        )}
      </div>

      <button
        type="button"
        className="employee-notifications-view-all"
        onClick={() => {
          onViewAll?.();
          onClose?.();
        }}
      >
        View All Notifications
      </button>
    </div>
  );
}
