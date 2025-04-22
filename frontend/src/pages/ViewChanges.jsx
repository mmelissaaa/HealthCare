import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewChanges = () => {
  const [changes, setChanges] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch changes on component mount
  useEffect(() => {
    const fetchChanges = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/hospital-changes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChanges(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch changes", error);
        setLoading(false);
      }
    };

    fetchChanges();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Hospital Changes</h1>
      {changes.length > 0 ? (
        <ul>
          {changes.map((change) => (
            <li key={change._id}>
              <h3>Title: {change.title}</h3>
              <p>Description: {change.description}</p>
              <p>Submitted by: {change.submittedBy?.name || "ADMIN"}</p>
              <p>Date: {new Date(change.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No changes found.</p>
      )}
    </div>
  );
};

export default ViewChanges;