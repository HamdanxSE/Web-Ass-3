// Updated context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup, logout, checkSession } from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check session on page load
  useEffect(() => {
    const verifySession = async () => {
      try {
        const data = await checkSession();
        if (data && data.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.error("Session verification error:", err);
        // User not logged in, that's okay
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  // Handle Login - using named functions that match what the form expects
  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login({ email, password });
      setUser(data.user);
      
      // Store token in localStorage for authentication
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      
      // Navigate based on role
      navigateBasedOnRole(data.user.role);
      return data.user;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Handle Signup
  const handleSignup = async (email, name, password, role, extraFields = {}) => {
    setLoading(true);
    setError(null);
    try {
      const userData = {
        email,
        name,
        password,
        role,
        ...extraFields
      };
      
      const data = await signup(userData);
      setUser(data.user);
      
      // Store token in localStorage for authentication
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      
      // Navigate based on role
      navigateBasedOnRole(data.user.role);
      return data.user;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      localStorage.removeItem("token");
      navigate("/auth");
    } catch (err) {
      console.error("Logout error:", err);
      throw err;
    }
  };

  // Navigate based on user role
  const navigateBasedOnRole = (role) => {
    switch (role) {
      case "admin":
        navigate("/admin/dashboard");
        break;
      case "tutor":
        navigate("/tutor/dashboard");
        break;
      case "student":
        navigate("/student/dashboard");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        error,
        handleLogin, 
        handleSignup, 
        handleLogout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};