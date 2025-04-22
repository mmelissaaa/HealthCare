// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, getUserRole, logout, getUserId } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const role = getUserRole();
  const userId = getUserId(); // Get the logged-in user's ID

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Home</Link>

      {/* Patient Links */}
      {role === "patient" && (
        <>
          <Link to="/patient-profile">Patient Profile</Link>
          <Link to="/appointments">Appointments</Link>
          <Link to="/send-message">Send Message</Link>
          <Link to="/messages">Messages</Link>
          <Link to={`/view-treatment-plans/${userId}`}>View Treatment Plans </Link>
          <Link to="/notifications">Notifications</Link>
          <Link to={`/medical-records/${userId}`}>Records</Link> 
          <Link to="/view-changes">View changes</Link> 
          <Link to="/diagnosis">Diagnosis</Link> 


          
        </>
      )}

      {/* Doctor Links */}
      {role === "doctor" && (
        <>
          <Link to="/doctor-profile">Doctor Profile</Link>
          <Link to="/add-medical-record">Medical Records</Link>
          <Link to="/treatment-plans">Treatment Plans</Link>
          <Link to="/appointments">Appointments</Link>
          <Link to="/messages">Messages</Link>
          <Link to="/notifications">Notifications</Link>
          <Link to="/send-message">Send Message</Link>
          <Link to="/create-app">Create appointment</Link>

          <Link to="/create-treatment-plan">Create Treatment Plan</Link>
        </>
      )}

      {/* Caregiver Links */}
      {role === "caregiver" && (
        <>
          <Link to="/caregiver-profile">Caregiver Profile</Link>
          <Link to="/appointments">Appointments</Link>
          <Link to="/messages">Messages</Link>
          <Link to="/send-message">Send Message</Link>
          <Link to="/notifications">Notifications</Link>
        </>
      )}

      {/* Admin Links */}
      {role === "admin" && (
        <>
          <Link to="/admin-panel">Admin Panel</Link>create-treatment-plan
          <Link to="/create-treatment-plan">Create plans </Link>
          <Link to="/send-message">Send Message</Link>
          <Link to="/create-change">Hospital Changes </Link>

        </>
      )}

      {/* Logout Button */}
      {isAuthenticated() && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </nav>
  );
};

export default Navbar;