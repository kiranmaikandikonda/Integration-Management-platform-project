import { createContext, useEffect, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check whether the user is already logged in
  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/auth/profile");

        setUser(response.data.user || response.data);
      } catch (error) {
        console.error("Authentication failed:", error.message);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  // Login
  const login = (userData, token) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
