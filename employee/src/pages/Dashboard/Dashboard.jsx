
import { useState } from "react";

import {
  Clock,
  CalendarDays,
  BriefcaseBusiness,
  ShieldCheck,
  Wallet,
  Send,
  Megaphone,
  Sun,
  CheckCircle2,
  ArrowRight,
  Bell,
  UserRound,
} from "lucide-react";

export default function Dashboard({ onNavigate }) {
  const [checkedIn, setCheckedIn] = useState(false);

  // Demo employee information
  const employee = {
    name: "Tiblet Alemayehu",
    department: "Cybersecurity & Quality Assurance",
    employeeId: "T2323",
    grade: "Grade II (Associate)",
    employmentType: "PERMANENT",
    leaveBalance: 0,
  };

  // Demo announcements
  const announcements = [
    {
      id: 1,
      title: "Department Staff Meeting",
      description:
        "All department employees are invited to attend the monthly staff meeting. Please arrive on time.",
      date: "10/22/2026",
    },
    {
      id: 2,
      title: "Updated HR Policies",
      description:
        "Employees are encouraged to review the updated organizational HR policies and procedures.",
      date: "10/22/2026",
    },
  ];

  // Demo holidays
  const holidays = [
    {
      id: 1,
      name: "Upcoming Public Holiday",
      date: "November 11, 2026",
    },
    {
      id: 2,
      name: "Organization Holiday",
      date: "November 20, 2026",
    },
  ];

  // Demo activities
  const activities = [
    {
      id: 1,
      title: "Employee account activated",
      date: "Recently",
    },
    {
      id: 2,
      title: "Profile information updated",
      date: "Recently",
    },
  ];

  const handleAttendance = () => {
    setCheckedIn((previous) => !previous);
  };

  return (
    <div className="employee-content">

      {/* SECURITY NOTICE */}
      <section className="employee-security-notice">
        <div className="employee-security-icon">
          <ShieldCheck size={22} />
        </div>

        <div>
          <h4>Account Security Notice</h4>
          <p>
            For your account security, please change your temporary
            password the first time you log in.
          </p>
        </div>
      </section>

      {/* WELCOME BANNER */}
      <section className="employee-welcome">
        <div className="employee-welcome-content">
          <p className="employee-welcome-label">
            EMPLOYEE DASHBOARD
          </p>

          <h2>Welcome back, {employee.name}!</h2>

          <p className="employee-welcome-description">
            <span>{employee.department}</span>
            <span>Employee ID: {employee.employeeId}</span>
          </p>
        </div>

        <button
          className="employee-checkin-button"
          onClick={handleAttendance}
        >
          <Clock size={18} />

          {checkedIn ? "Check Out" : "Attendance Check-In"}
        </button>
      </section>

      {/* SUMMARY */}
      <section className="employee-section">
        <div className="employee-section-header">
          <div>
            <h3>My Overview</h3>
            <p>Your employment information at a glance</p>
          </div>
        </div>

        <div className="employee-stats-grid">

          {/* ATTENDANCE */}
          <div className="employee-stat-card">
            <div className="employee-stat-top">
              <div className="employee-stat-icon blue">
                <Clock size={21} />
              </div>
            </div>

            <h4>Today's Duty</h4>

            <div className="employee-stat-value">
              {checkedIn ? "Checked In" : "Pending Check-In"}
            </div>

            <p className="employee-stat-subtitle">
              {checkedIn
                ? "Your attendance has been marked"
                : "You have not checked in yet"}
            </p>
          </div>

          {/* LEAVE */}
          <div className="employee-stat-card">
            <div className="employee-stat-top">
              <div className="employee-stat-icon green">
                <CalendarDays size={21} />
              </div>
            </div>

            <h4>Leave Balance</h4>

            <div className="employee-stat-value">
              {employee.leaveBalance} Days
            </div>

            <p className="employee-stat-subtitle">
              Available leave balance
            </p>
          </div>

          {/* JOB GRADE */}
          <div className="employee-stat-card">
            <div className="employee-stat-top">
              <div className="employee-stat-icon purple">
                <BriefcaseBusiness size={21} />
              </div>
            </div>

            <h4>Job Grade & Scale</h4>

            <div className="employee-stat-value">
              {employee.grade}
            </div>

            <p className="employee-stat-subtitle">
              Current employee grade
            </p>
          </div>

          {/* EMPLOYMENT STATUS */}
          <div className="employee-stat-card">
            <div className="employee-stat-top">
              <div className="employee-stat-icon yellow">
                <CheckCircle2 size={21} />
              </div>
            </div>

            <h4>Employment Status</h4>

            <div className="employee-stat-value">
              <span style={{ color: "#16a36a" }}>
                ACTIVE
              </span>
            </div>

            <p className="employee-stat-subtitle">
              {employee.employmentType}
            </p>
          </div>

        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="employee-section">
        <div className="employee-section-header">
          <div>
            <h3>Quick Actions</h3>
            <p>Access your employee services quickly</p>
          </div>
        </div>

        <div className="employee-actions-grid">

          <button
            className="employee-action-card"
            onClick={() => onNavigate?.("My Payroll")}
          >
            <div className="employee-action-icon blue">
              <Wallet size={23} />
            </div>

            <div className="employee-action-text">
              <h4>My Payroll & Payslips</h4>
              <p>View salary details and download payslips</p>
            </div>

            <ArrowRight size={17} />
          </button>

          <button
            className="employee-action-card"
            onClick={() => onNavigate?.("My Leave")}
          >
            <div className="employee-action-icon green">
              <CalendarDays size={23} />
            </div>

            <div className="employee-action-text">
              <h4>Leave Requests</h4>
              <p>Apply for leave and track applications</p>
            </div>

            <ArrowRight size={17} />
          </button>

          <button
            className="employee-action-card"
            onClick={() => onNavigate?.("Reports")}
          >
            <div className="employee-action-icon orange">
              <Send size={23} />
            </div>

            <div className="employee-action-text">
              <h4>Submit Report</h4>
              <p>Send reports and updates to your manager</p>
            </div>

            <ArrowRight size={17} />
          </button>

        </div>
      </section>

      {/* ANNOUNCEMENTS AND HOLIDAYS */}
      <div className="employee-bottom-grid">

        {/* ANNOUNCEMENTS */}
        <section className="employee-section">
          <div className="employee-section-header">
            <div>
              <h3>Department Announcements</h3>
              <p>Latest news and updates from your department</p>
            </div>

            <Bell size={19} color="#778196" />
          </div>

          <div className="employee-announcements">
            {announcements.map((announcement) => (
              <article
                key={announcement.id}
                className="employee-announcement-card"
              >
                <div className="employee-announcement-icon">
                  <Megaphone size={20} />
                </div>

                <div className="employee-announcement-content">
                  <h4>{announcement.title}</h4>
                  <p>{announcement.description}</p>

                  <div className="employee-announcement-date">
                    {announcement.date}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* RIGHT SIDE */}
        <div>

          {/* HOLIDAYS */}
          <section className="employee-section">
            <div className="employee-section-header">
              <div>
                <h3>Upcoming Holidays</h3>
                <p>Important upcoming dates</p>
              </div>
            </div>

            <div className="employee-announcements">
              {holidays.map((holiday) => (
                <article
                  key={holiday.id}
                  className="employee-announcement-card"
                >
                  <div className="employee-announcement-icon">
                    <Sun size={20} />
                  </div>

                  <div className="employee-announcement-content">
                    <h4>{holiday.name}</h4>
                    <p>{holiday.date}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* RECENT ACTIVITIES */}
          <section className="employee-section">
            <div className="employee-section-header">
              <div>
                <h3>Recent Activities</h3>
                <p>Your latest account activities</p>
              </div>
            </div>

            <div className="employee-announcements">
              {activities.map((activity) => (
                <article
                  key={activity.id}
                  className="employee-announcement-card"
                >
                  <div className="employee-announcement-icon">
                    <UserRound size={19} />
                  </div>

                  <div className="employee-announcement-content">
                    <h4>{activity.title}</h4>
                    <p>{activity.date}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

        </div>
      </div>

    </div>
  );
}
