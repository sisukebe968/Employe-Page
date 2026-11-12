
import { useState } from "react";
import { Bell, Menu, UserRound } from "lucide-react";

import Breadcrumbs from "./Breadcrumbs.jsx";
import NotificationsDropdown from "../dropdowns/NotificationsDropdown.jsx";
import UserProfileDropdown from "../dropdowns/UserProfileDropdown.jsx";

export default function Header({
  activePage,
  employee,
  onNavigate,
  onLogout,
  onOpenSidebar,
}) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown((current) =>
      current === name ? null : name
    );
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  const initials =
    employee?.employeeId?.slice(0, 2).toUpperCase() || "EM";

  return (
    <header className="employee-topbar">
      {/* LEFT SIDE */}
      <div className="employee-topbar-left">
        <button
          type="button"
          className="employee-menu-button"
          onClick={onOpenSidebar}
          aria-label="Open menu"
        >
          <Menu size={21} />
        </button>

        <div>
          <h1>{activePage}</h1>
          <Breadcrumbs activePage={activePage} />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="employee-topbar-right">

        {/* NOTIFICATIONS */}
        <div className="employee-dropdown-wrapper">
          <button
            type="button"
            className={`employee-notification-button ${
              openDropdown === "notifications" ? "selected" : ""
            }`}
            aria-label="Open notifications"
            aria-expanded={openDropdown === "notifications"}
            onClick={() => toggleDropdown("notifications")}
          >
            <Bell size={19} />
            <span className="employee-notification-dot" />
          </button>

          {openDropdown === "notifications" && (
            <NotificationsDropdown
              onViewAll={() => {
                onNavigate("Notifications");
                closeDropdown();
              }}
              onClose={closeDropdown}
            />
          )}
        </div>

        {/* EMPLOYEE PROFILE */}
        <div className="employee-dropdown-wrapper">
          <button
            type="button"
            className="employee-topbar-profile employee-profile-trigger"
            aria-expanded={openDropdown === "profile"}
            aria-label="Open employee profile menu"
            onClick={() => toggleDropdown("profile")}
          >
            <div className="employee-avatar">
              {initials}
            </div>

            <span className="employee-profile-trigger-info">
              <strong>{employee?.name || "Employee"}</strong>
              <small>
                {employee?.employeeId || "Employee"}
              </small>
            </span>

            <UserRound
              className="employee-profile-extra-icon"
              size={15}
            />
          </button>

          {openDropdown === "profile" && (
            <UserProfileDropdown
              employee={employee}
              onViewProfile={() => {
                onNavigate("My Profile");
                closeDropdown();
              }}
              onNavigate={onNavigate}
              onLogout={onLogout}
              onClose={closeDropdown}
            />
          )}
        </div>
      </div>
    </header>
  );
}
