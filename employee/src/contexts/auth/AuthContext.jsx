
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("employeeUser")) || null;
    } catch {
      return null;
    }
  });

  const login = (credentials) => {
    const employeeId = credentials.employeeId?.trim();
    const password = credentials.password;

    if (!employeeId || !password?.trim()) {
      return {
        success: false,
        message: "Employee ID and password are required.",
      };
    }

    // FRONTEND DEMO ONLY:
    // Any non-empty Employee ID and password are accepted.
    const employee = {
      employeeId,
      name: "Employee",
    };

    setUser(employee);
    sessionStorage.setItem("employeeUser", JSON.stringify(employee));

    return {
      success: true,
      user: employee,
    };
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("employeeUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
