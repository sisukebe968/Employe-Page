import { useState } from "react";
import {
  Bell,
  CheckCheck,
  CalendarDays,
  Wallet,
  Megaphone,
  FileText,
  Trash2,
} from "lucide-react";

import Card from "../../components/common/Card.jsx";
import Badge from "../../components/common/Badge.jsx";

const initialNotifications = [
  {
    id: 1,
    title: "Leave application received",
    message: "Your annual leave application has been submitted.",
    date: "Today",
    type: "leave",
    read: false,
  },
  {
    id: 2,
    title: "Payroll announcement",
    message: "Your monthly payslip is available for review.",
    date: "Yesterday",
    type: "payroll",
    read: false,
  },
  {
    id: 3,
    title: "Department announcement",
    message: "Please attend the upcoming department meeting.",
    date: "November 5, 2026",
    type: "announcement",
    read: true,
  },
  {
    id: 4,
    title: "Profile reminder",
    message: "Review your employee profile information.",
    date: "November 2, 2026",
    type: "profile",
    read: true,
  },
];

const notificationIcons = {
  leave: CalendarDays,
  payroll: Wallet,
  announcement: Megaphone,
  profile: FileText,
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(
    initialNotifications
  );

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  const markAllRead = () => {
    setNotifications((items) =>
      items.map((item) => ({ ...item, read: true }))
    );
  };

  const markRead = (id) => {
    setNotifications((items) =>
      items.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const removeNotification = (id) => {
    setNotifications((items) =>
      items.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="module-page">
      <div className="module-heading">
        <div>
          <span className="module-eyebrow">EMPLOYEE SELF SERVICE</span>
          <h1>Notifications</h1>
          <p>Stay updated with your employee activities.</p>
        </div>

        <button
          className="common-button secondary"
          type="button"
          onClick={markAllRead}
        >
          <CheckCheck size={17} />
          Mark all as read
        </button>
      </div>

      <div className="module-stats-grid">
        <div className="common-stat-card">
          <div className="common-stat-icon blue"><Bell size={22} /></div>
          <div><p>Total Notifications</p><h2>{notifications.length}</h2></div>
        </div>

        <div className="common-stat-card">
          <div className="common-stat-icon gold"><Bell size={22} /></div>
          <div><p>Unread Notifications</p><h2>{unreadCount}</h2></div>
        </div>
      </div>

      <Card title="Recent Notifications">
        <div className="notification-list">
          {notifications.map((item) => {
            const Icon = notificationIcons[item.type] || Bell;

            return (
              <article
                key={item.id}
                className={`notification-item ${item.read ? "read" : "unread"}`}
              >
                <div className="notification-icon">
                  <Icon size={21} />
                </div>

                <div className="notification-content">
                  <div className="notification-title-row">
                    <h3>{item.title}</h3>
                    {!item.read && <Badge color="gold">New</Badge>}
                  </div>

                  <p>{item.message}</p>
                  <small>{item.date}</small>
                </div>

                <div className="module-row-actions">
                  {!item.read && (
                    <button
                      type="button"
                      title="Mark as read"
                      onClick={() => markRead(item.id)}
                    >
                      <CheckCheck size={17} />
                    </button>
                  )}

                  <button
                    type="button"
                    title="Delete notification"
                    onClick={() => removeNotification(item.id)}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </article>
            );
          })}

          {!notifications.length && (
            <div className="payslip-empty-state">
              <Bell size={35} />
              <h3>No notifications</h3>
              <p>You are all caught up.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}