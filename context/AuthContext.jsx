import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const refresh = async () => {
    try {
      const response = await axios.get(
        "https://bacai-backend.onrender.com/refresh",
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      setIsLoggedIn(true);
      setLoading(false);
    } catch (err) {
      localStorage.setItem("accessToken", "");
      setLoading(false);
      setIsLoggedIn(false);
    }
  };
  const checkAuth = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setLoading(false);
      setIsLoggedIn(false);
      return;
    }
    try {
      const response = await axios.get(
        "https://bacai-backend.onrender.com/is-auth",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      setIsLoggedIn(true);
    } catch (err) {
      if (err.status == 403) {
        refresh();
      } else {
        localStorage.setItem("accessToken", "");
        setLoading(false);
        setIsLoggedIn(false);
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = { isLoggedIn, setIsLoggedIn, loading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
