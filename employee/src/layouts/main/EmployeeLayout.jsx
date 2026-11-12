import { useState } from "react";
import Sidebar from "../navigation/Sidebar.jsx";
import Header from "../navigation/Header.jsx";

export default function EmployeeLayout({
  navigation,
  activePage,
  employee,
  onNavigate,
  onLogout,
  children,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigation = (page) => {
    onNavigate(page);
    setSidebarOpen(false);
  };

  return (
    <div className="employee-portal">
      <Sidebar
        navigation={navigation}
        activePage={activePage}
        employee={employee}
        onNavigate={handleNavigation}
        onLogout={onLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="employee-main">
        <Header
          activePage={activePage}
          employee={employee}
          onNavigate={handleNavigation}
          onLogout={onLogout}
          onOpenSidebar={() => setSidebarOpen(true)}
        />
        {children}
      </main>
    </div>
  );
}
