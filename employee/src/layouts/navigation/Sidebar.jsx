import { ChevronRight, LogOut, X } from "lucide-react";

export default function Sidebar({
  navigation,
  activePage,
  employee,
  onNavigate,
  onLogout,
  isOpen,
  onClose,
}) {
  const initials =
    employee?.employeeId?.slice(0, 2).toUpperCase() || "EM";

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="employee-sidebar-overlay"
          onClick={onClose}
          aria-label="Close navigation menu"
        />
      )}

      <aside className={`employee-sidebar ${isOpen ? "open" : ""}`}>
        <div className="employee-brand">
          <div className="employee-brand-logo">H</div>
          <div>
            <h2>HADIYA HRMS</h2>
            <p>Employee Portal</p>
          </div>
          <button
            type="button"
            className="employee-sidebar-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={21} />
          </button>
        </div>

        <nav className="employee-nav" aria-label="Employee navigation">
          {navigation.map((group) => (
            <div key={group.title}>
              <p className="employee-nav-label">{group.title}</p>
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    type="button"
                    key={item.name}
                    className={`employee-nav-link ${
                      activePage === item.name ? "active" : ""
                    }`}
                    onClick={() => onNavigate(item.name)}
                  >
                    <Icon size={19} />
                    <span>{item.name}</span>
                    {activePage === item.name && (
                      <ChevronRight
                        size={17}
                        className="employee-nav-arrow"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="employee-sidebar-bottom">
          <div className="employee-user">
            <div className="employee-avatar">{initials}</div>
            <div className="employee-user-info">
              <h4>{employee?.name || "Employee"}</h4>
              <p>{employee?.employeeId || "Employee"}</p>
            </div>
          </div>
          <button
            type="button"
            className="employee-logout"
            onClick={onLogout}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
