// src/pages/AddMedicalRecord.jsx
import React, { useState, useEffect } from "react";
import { createMedicalRecord } from "../utils/api";
import axios from "axios";
import { getToken } from "../utils/auth";

const AddMedicalRecord = () => {
  const [users, setUsers] = useState([]); // State to store the list of users
  const [selectedUserId, setSelectedUserId] = useState(""); // State to store the selected user ID
  const [recordType, setRecordType] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the list of users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = getToken();
        const response = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const record = await createMedicalRecord(selectedUserId, recordType, description);
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
      <h1>Add Medical Record</h1>
      <form onSubmit={handleSubmit}>
        {/* Dropdown for selecting a user */}
        <div>
          <label>Select Patient:</label>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            required
          >
            <option value="">Select a patient</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
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

export default AddMedicalRecord;