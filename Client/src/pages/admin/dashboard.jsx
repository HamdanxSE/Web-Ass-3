import React from "react";
import DashboardLayout from "../../components/common/dashboardLayout";

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="admin-dashboard">
        {/* ✅ Summary Cards */}
        <div className="dashboard-cards">
          <div className="card">
            <h3>Pending Tutors</h3>
            <p>12</p>
          </div>
          <div className="card">
            <h3>Approved Tutors</h3>
            <p>85</p>
          </div>
          <div className="card">
            <h3>Total Users</h3>
            <p>1023</p>
          </div>
          <div className="card">
            <h3>Reports Filed</h3>
            <p>8</p>
          </div>
        </div>

        {/* ✅ Recent Activities */}
        <div className="recent-activities">
          <h2>Recent Activities</h2>
          <ul>
            <li>Admin approved Tutor John Doe <span>5 mins ago</span></li>
            <li>New report submitted by Student Jane <span>15 mins ago</span></li>
            <li>Admin rejected Tutor Mark's verification <span>30 mins ago</span></li>
          </ul>
        </div>

        {/* ✅ Charts Placeholder (To be implemented later) */}
        <div className="charts-section">
          <h2>Analytics Overview</h2>
          <p>Charts will be added here...</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
