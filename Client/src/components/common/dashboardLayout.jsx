import React from "react";
import Sidebar from "./sidebar";
import TopNavbar from "./topnavbar";
import { useAuth } from "../../../hooks/useAuth"; // Ensure role-based layout
import "../../assets/css/dashboard.css";
const DashboardLayout = ({ children }) => {
  const { user } = useAuth(); // Get logged-in user

  return (
    <div className={`dashboard-container ${user?.role}-dashboard`}> {/* ✅ Role-Based Class */}
      <Sidebar />
      <div className="dashboard-main">
        <TopNavbar />
        <main className="dashboard-content">{children}</main> {/* ✅ Improved Semantics */}
      </div>
    </div>
  );
};

export default DashboardLayout;
