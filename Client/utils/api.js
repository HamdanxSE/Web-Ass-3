// utils/api.js
import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // For session-based auth
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Login API Call
export const login = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Login API error:", error.response?.data || error.message);
    throw error.response?.data?.message || "Login failed";
  }
};

// Signup API Call
export const signup = async (userData) => {
  try {
    const response = await api.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    console.error("Signup API error:", error.response?.data || error.message);
    throw error.response?.data?.message || "Signup failed";
  }
};

// Logout API Call
export const logout = async () => {
  try {
    const response = await api.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Logout API error:", error.response?.data || error.message);
    throw error.response?.data?.message || "Logout failed";
  }
};

// Check Session API Call
export const checkSession = async () => {
  try {
    const response = await api.get("/auth/session");
    return response.data;
  } catch (error) {
    console.error("Session API error:", error.response?.data || error.message);
    throw error.response?.data?.message || "Session verification failed";
  }
};