import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const TopNavbar = () => {
  const { user, logout } = useAuth(); // Get user data

  return (
    <header className="top-navbar">
      <div className="navbar-left">
        <h3>Admin Panel</h3> {/* ✅ Clearer Label */}
      </div>
      <div className="navbar-right">
        <Link to="/notifications" className="icon-btn">
          🔔 {/* Notification Icon */}
        </Link>
        <div className="profile-dropdown">
          <span>{user?.name} (Admin)</span> {/* ✅ Role Display */}
          <div className="dropdown-menu">
            <Link to="/admin/profile">Admin Profile</Link> {/* ✅ Role-Specific */}
            <button className="logout-btn" onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
