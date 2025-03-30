import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth"; // Custom hook for authentication

const Sidebar = () => {
  const { user } = useAuth(); // Get user role

  // Check if user exists and has a role
  if (!user || !user.role) {
    return <div>Loading...</div>; // Or return a placeholder, spinner, or redirect to login page
  }

  const menuItems = {
    admin: [
      { path: "/admin/dashboard", label: "Dashboard" },
      { path: "/admin/verification", label: "Tutor Verification" },
      { path: "/admin/statistics", label: "Statistics" },
      { path: "/admin/reports", label: "Analytics & Reports" },
      { path: "/admin/profile", label: "Profile Settings" },
      { path: "/admin/settings", label: "Settings" },
    ],
    student: [
      { path: "/student/dashboard", label: "Dashboard" },
      { path: "/student/courses", label: "Courses" },
      { path: "/student/profile", label: "Profile Settings" },
    ],
    tutor: [
      { path: "/tutor/dashboard", label: "Dashboard" },
      { path: "/tutor/courses", label: "Courses" },
      { path: "/tutor/profile", label: "Profile Settings" },
    ]
  };

  return (
    <aside className="sidebar">
      <h2>EduConnect</h2>
      <nav>
        <ul>
          {menuItems[user?.role]?.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
