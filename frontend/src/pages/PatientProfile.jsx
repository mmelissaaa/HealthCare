import React, { useEffect, useState } from "react";
import axios from "axios";

const PatientProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    medicalHistory: "",
    allergies: "",
    medications: "",
  });

  // Fetch patient profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/patients/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setProfile(response.data);
        setFormData({
          medicalHistory: response.data.medicalHistory,
          allergies: response.data.allergies,
          medications: response.data.medications,
        });
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };

    fetchProfile();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission (update profile)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:5000/api/patients/profile",
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setProfile(response.data);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile");
    }
  };

  // Handle profile deletion
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
      try {
        await axios.delete("http://localhost:5000/api/patients/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        alert("Profile deleted successfully!");
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login page
      } catch (error) {
        console.error("Failed to delete profile", error);
        alert("Failed to delete profile");
      }
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h1>Patient Profile</h1>
      <p>Name: {profile.userId.name}</p>
      <p>Email: {profile.userId.email}</p>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Medical History:</label>
            <textarea
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Allergies:</label>
            <input
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Medications:</label>
            <input
              type="text"
              name="medications"
              value={formData.medications}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <p>Medical History: {profile.medicalHistory}</p>
          <p>Allergies: {profile.allergies}</p>
          <p>Medications: {profile.medications}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          <button onClick={handleDelete} style={{ backgroundColor: "red", color: "white" }}>
            Delete Profile
          </button>
        </>
      )}
    </div>
  );
};

export default PatientProfile;