import React, { useState, useEffect } from "react";
import { createMedicalRecord } from "../utils/api";
import axios from "axios";
import { getToken } from "../utils/auth";

const MedicalRecords = () => {
  const [patients, setPatients] = useState([]); // State to store the list of patients
  const [selectedPatientId, setSelectedPatientId] = useState(""); // State to store the selected patient ID
  const [recordType, setRecordType] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the list of patients when the component mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = getToken();
        const response = await axios.get("http://localhost:5000/api/patients", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatients(response.data);
      } catch (error) {
        console.error("Failed to fetch patients", error);
        setError("Failed to fetch patients. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const record = await createMedicalRecord(selectedPatientId, recordType, description);
      alert("Medical record created successfully!");
      console.log("Created record:", record);
    } catch (error) {
      alert("Failed to create medical record");
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Medical Records</h1>
      <form onSubmit={handleSubmit}>
        {/* Dropdown for selecting a patient */}
        <div>
          <label>Select Patient:</label>
          <select
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
            required
          >
            <option value="">Select a patient</option>
            {patients.map((patient) => (
              <option key={patient._id} value={patient.userId._id}>
                {patient.userId.name}
              </option>
            ))}
          </select>
        </div>

        {/* Input for record type */}
        <div>
          <label>Record Type:</label>
          <input
            type="text"
            placeholder="Record Type"
            value={recordType}
            onChange={(e) => setRecordType(e.target.value)}
            required
          />
        </div>

        {/* Textarea for description */}
        <div>
          <label>Description:</label>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Submit button */}
        <button type="submit">Create Record</button>
      </form>
    </div>
  );
};

export default MedicalRecords;