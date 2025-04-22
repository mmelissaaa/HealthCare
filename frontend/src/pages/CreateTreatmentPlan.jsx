import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminCreateTreatmentPlan = () => {
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    diagnosis: "",
    prescription: "",
    notes: "",
  });
  const [users, setUsers] = useState([]); // Store list of users (patients and doctors)
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch users", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/treatment-plans",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Treatment plan created successfully!");
      console.log(response.data);
      // Reset form after successful submission
      setFormData({
        patientId: "",
        doctorId: "",
        diagnosis: "",
        prescription: "",
        notes: "",
      });
    } catch (error) {
      console.error("Failed to create treatment plan", error);
      alert("Failed to create treatment plan");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Create Treatment Plan (Admin)</h1>
      <form onSubmit={handleSubmit}>
        {/* Patient Dropdown */}
        <div>
          <label>Patient:</label>
          <select
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            required
          >
            <option value="">Select a patient</option>
            {users
              .filter((user) => user.role === "patient") // Filter only patients
              .map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
          </select>
        </div>

        {/* Doctor Dropdown */}
        <div>
          <label>Doctor:</label>
          <select
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            required
          >
            <option value="">Select a doctor</option>
            {users
              .filter((user) => user.role === "doctor") // Filter only doctors
              .map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
          </select>
        </div>

        {/* Diagnosis Field */}
        <div>
          <label>Diagnosis:</label>
          <input
            type="text"
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            required
          />
        </div>

        {/* Prescription Field */}
        <div>
          <label>Prescription:</label>
          <input
            type="text"
            name="prescription"
            value={formData.prescription}
            onChange={handleChange}
            required
          />
        </div>

        {/* Notes Field */}
        <div>
          <label>Notes:</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Create Plan</button>
      </form>
    </div>
  );
};

export default AdminCreateTreatmentPlan;