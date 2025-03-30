import React, { useState } from "react";
import DashboardLayout from "../../components/common/dashboardLayout";

const tutorData = [
  { id: 1, name: "John Doe", subject: "Mathematics", status: "Pending" },
  { id: 2, name: "Jane Smith", subject: "Physics", status: "Pending" },
  { id: 3, name: "Mike Johnson", subject: "Computer Science", status: "Pending" },
];

const TutorVerification = () => {
  const [tutors, setTutors] = useState(tutorData);

  const handleVerification = (id, action) => {
    setTutors((prevTutors) =>
      prevTutors.map((tutor) =>
        tutor.id === id ? { ...tutor, status: action } : tutor
      )
    );
  };

  return (
    <DashboardLayout>
      <div className="tutor-verification">
        <h2>Tutor Verification</h2>
        <table className="verification-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tutors.map((tutor) => (
              <tr key={tutor.id}>
                <td>{tutor.name}</td>
                <td>{tutor.subject}</td>
                <td>
                  <span className={`status-badge ${tutor.status.toLowerCase()}`}>
                    {tutor.status}
                  </span>
                </td>
                <td>
                  {tutor.status === "Pending" ? (
                    <>
                      <button
                        className="approve-btn"
                        onClick={() => handleVerification(tutor.id, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => handleVerification(tutor.id, "Rejected")}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="verified">✔ Verified</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default TutorVerification;
