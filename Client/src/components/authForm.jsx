// Update AuthForm.jsx to match context properties
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "../assets/css/auth.css";

const AuthForm = ({ isLogin }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [hourlyRate, setHourlyRate] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("");
  const [bio, setBio] = useState("");
  const [subjects, setSubjects] = useState("");
  const [formError, setFormError] = useState("");
  
  // Make sure we're using the correct property names from context
  const { handleLogin, handleSignup, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    
    try {
      if (isLogin) {
        await handleLogin(email, password);
        // Navigation is handled in the auth context
      } else {
        const extraFields = {};
        
        if (role === "tutor") {
          extraFields.hourlyRate = hourlyRate;
          extraFields.location = location;
          extraFields.availability = availability;
          extraFields.bio = bio;
          extraFields.subjects = subjects;
        }
        
        await handleSignup(email, name, password, role, extraFields);
        // Navigation is handled in the auth context
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setFormError(typeof error === 'string' ? error : "Authentication failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {(formError || error) && <div className="error-message">{formError || error}</div>}
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
      </div>
      {!isLogin && (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
        </div>
      )}
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </div>
      {!isLogin && (
        <div>
          <select onChange={(e) => setRole(e.target.value)} value={role}>
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      )}
      {role === "tutor" && !isLogin && (
        <div className="tutor-fields">
          <input
            type="number"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            placeholder="Hourly Rate"
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
          />
          <input
            type="text"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            placeholder="Availability"
          />
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio"
          />
          <input
            type="text"
            value={subjects}
            onChange={(e) => setSubjects(e.target.value)}
            placeholder="Subjects"
          />
        </div>
      )}
      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
      </button>
    </form>
  );
};

export default AuthForm;