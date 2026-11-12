
import {
  UserRound,
  LockKeyhole,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function UserProfileDropdown({
  employee,
  onViewProfile,
  onNavigate,
  onLogout,
  onClose,
}) {
  const initials =
    employee?.employeeId?.slice(0, 2).toUpperCase() || "EM";

  const handleProfile = () => {
    onViewProfile?.();
    onClose?.();
  };

  const handleChangePassword = () => {
    onNavigate?.("Change Password");
    onClose?.();
  };

  const handleLogout = () => {
    onClose?.();
    onLogout?.();
  };

  return (
    <div
      className="employee-profile-dropdown"
      role="menu"
      aria-label="Employee account menu"
    >
      <div className="employee-profile-dropdown-info">
        <div className="employee-avatar employee-dropdown-avatar">
          {initials}
        </div>

        <div>
          <h4>{employee?.name || "Employee"}</h4>
          <p>{employee?.employeeId || "Employee ID"}</p>
        </div>
      </div>

      <div className="employee-profile-dropdown-divider" />

      <button
        type="button"
        className="employee-profile-dropdown-item"
        onClick={handleProfile}
        role="menuitem"
      >
        <UserRound size={18} />
        <span>My Profile</span>
        <ChevronRight size={16} />
      </button>

      <button
        type="button"
        className="employee-profile-dropdown-item"
        onClick={handleChangePassword}
        role="menuitem"
      >
        <LockKeyhole size={18} />
        <span>Change Password</span>
        <ChevronRight size={16} />
      </button>

      <div className="employee-profile-dropdown-divider" />

      <button
        type="button"
        className="employee-profile-dropdown-item logout"
        onClick={handleLogout}
        role="menuitem"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </div>
  );
}
