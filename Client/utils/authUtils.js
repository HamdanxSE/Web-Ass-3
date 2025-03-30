// src/utils/authUtils.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/auth'; // Adjust to your backend URL

export const registerStudent = async (studentData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register/student`, studentData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Registration failed');
  }
};

export const registerTutor = async (tutorData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register/tutor`, tutorData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Registration failed');
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Login failed');
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Password reset failed');
  }
};