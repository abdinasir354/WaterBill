import React, { createContext, useContext, useState, useEffect } from "react";
import { useData } from "./DataContext";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [attempts, setAttempts] = useState(0);
  const [blockedUntil, setBlockedUntil] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("aquaPayUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const { users, addUser } = useData();

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      const now = new Date().getTime();
      if (blockedUntil && now < blockedUntil) {
        reject(new Error("Too many attempts. Try again later."));
        return;
      }

      setTimeout(() => {
        const foundUser = users.find(
          (u) => u.email === email && password === (u.password || "user123")
        );

        // Hardcoded admin/user check
        let defaultUser = null;
        if (email === "admin@aquapay.com" && password === "admin123") {
          defaultUser = {
            id: "admin1",
            name: "System Admin",
            email,
            role: "admin",
            avatar: "🛡️",
          };
        } else if (email === "user@aquapay.com" && password === "user123") {
          defaultUser = {
            id: "user1",
            name: "John Doe",
            email,
            role: "user",
            avatar: "👤",
          };
        }

        if (foundUser || defaultUser) {
          const loggedUser = foundUser || defaultUser;
          setUser(loggedUser);
          localStorage.setItem("aquaPayUser", JSON.stringify(loggedUser));
          setAttempts(0);
          resolve(loggedUser);
          return;
        }

        // Wrong login
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (newAttempts >= 3) {
          setBlockedUntil(now + 30 * 1000); // block 30s
          setAttempts(0); // reset attempts after block
          reject(
            new Error("Too many attempts! Wait 30 seconds before trying again.")
          );
        } else {
          reject(new Error("Invalid email or password."));
        }
      }, 800);
    });
  };

  const register = (name, email, password, extraData = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = addUser({ name, email, password, ...extraData });
        setUser(newUser);
        localStorage.setItem("aquaPayUser", JSON.stringify(newUser));
        resolve(newUser);
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("aquaPayUser");
    setAttempts(0);
    setBlockedUntil(null);
  };

  const value = {
    user,
    login,
    logout,
    register,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
