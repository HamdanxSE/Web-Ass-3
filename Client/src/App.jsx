import React, { createContext, useState } from 'react';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom'; // ✅ Added Navigate
import { login, signup } from '../utils/api';
import AuthPage from './pages/auth/auth';
import AdminDashboard from './pages/admin/dashboard';
import StudentDashboard from './pages/student/dashboard';
import TutorDashboard from './pages/tutor/dashboard';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  /*
  // Commented out session handling for now, will enable later
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/session', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (err) {
        console.error("Session check error", err);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);
  */

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const data = await login(email, password);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/profile-setup');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (email, name, password, role, extraFields) => {
    setLoading(true);
    try {
      const data = await signup(email, name, password, role, extraFields);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/profile-setup');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, handleLogin, handleSignup, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* ✅ Added Default Route */}
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/tutor/dashboard" element={<TutorDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} /> {/* ✅ Add this */}
      </Routes>
    </AuthProvider>
  );
};

export { AuthContext, AuthProvider };
export default App;
