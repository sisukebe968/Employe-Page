import { useState } from "react";
import {
  LayoutDashboard,
  UserRound,
  Clock,
  Wallet,
  CalendarDays,
  Award,
  Gift,
  FileText,
  LockKeyhole,
  Bell,
  TrendingUp,
} from "lucide-react";

import Login from "./pages/Auth/Login.jsx";

import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import MyProfile from "./pages/Profile/MyProfile.jsx";
import ChangePassword from "./pages/Profile/ChangePassword.jsx";
import Attendance from "./pages/Attendance/Attendance.jsx";
import MyLeave from "./pages/Leave/MyLeave.jsx";
import MyPayroll from "./pages/Payroll/MyPayroll.jsx";
import Notifications from "./pages/Notifications/Notifications.jsx";
import CareerMilestones from "./pages/Career/CareerMilestones.jsx";
import MyReports from "./pages/Reports/MyReports.jsx";
import SubmitReport from "./pages/Reports/SubmitReport.jsx";
import RewardsAndRecognition from "./pages/Rewards/RewardsAndRecognition.jsx";

import EmployeeLayout from "./layouts/main/EmployeeLayout.jsx";

const navigation = [
  {
    title: "MAIN MENU",
    items: [
      { name: "Dashboard", icon: LayoutDashboard },
      { name: "My Profile", icon: UserRound },
      { name: "Attendance", icon: Clock },
      { name: "My Leave", icon: CalendarDays },
      { name: "My Payroll", icon: Wallet },
    ],
  },
  {
    title: "OTHER SERVICES",
    items: [
      { name: "Performance", icon: Award },
      { name: "Benefits", icon: Gift },
      { name: "Reports", icon: FileText },
      { name: "Career Milestones", icon: TrendingUp },
      { name: "My Reports", icon: FileText },
      { name: "Submit Report", icon: FileText },
      { name: "Rewards & Recognition", icon: Gift },
      { name: "Notifications", icon: Bell },
      { name: "Change Password", icon: LockKeyhole },
    ],
  },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [activePage, setActivePage] = useState("Dashboard");

  const handleLogin = (credentials) => {
    if (!credentials?.employeeId?.trim() || !credentials?.password) return;

    setEmployee({
      employeeId: credentials.employeeId.trim(),
      name: credentials.employeeId.trim(),
    });
    setActivePage("Dashboard");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmployee(null);
    setActivePage("Dashboard");
  };

  const handleNavigation = (page) => {
    setActivePage(page);
  };

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard onNavigate={handleNavigation} />;
      case "My Profile":
        return <MyProfile />;
      case "Attendance":
        return <Attendance />;
      case "My Leave":
        return <MyLeave />;
      case "My Payroll":
        return <MyPayroll />;
      case "Career Milestones":
        return <CareerMilestones />;
      case "My Reports":
        return <MyReports onNavigate={handleNavigation} />;
      case "Submit Report":
        return <SubmitReport />;
      case "Rewards & Recognition":
        return <RewardsAndRecognition />;
      case "Change Password":
        return <ChangePassword />;
      case "Notifications":
        return <Notifications />;
      default:
        return (
          <div className="employee-page-placeholder">
            <div className="employee-placeholder-icon">
              <FileText size={32} />
            </div>
            <h2>{activePage}</h2>
            <p>This section is currently under development.</p>
            <button
              type="button"
              className="employee-button employee-button-primary"
              onClick={() => handleNavigation("Dashboard")}
            >
              Back to Dashboard
            </button>
          </div>
        );
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <EmployeeLayout
      navigation={navigation}
      activePage={activePage}
      employee={employee}
      onNavigate={handleNavigation}
      onLogout={handleLogout}
    >
      {renderPage()}
    </EmployeeLayout>
  );
}
