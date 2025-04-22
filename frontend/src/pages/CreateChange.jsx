import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateChange = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/hospital-changes",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Change submitted successfully!");
      console.log(response.data);
      navigate("/view-changes"); // Redirect to view changes page
    } catch (error) {
      console.error("Failed to submit change", error);
      alert("Failed to submit change");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Submit Hospital Change</h1>
      <form onSubmit={handleSubmit}>
        {/* Title Field */}
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter change title"
            required
          />
        </div>

        {/* Description Field */}
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter change description"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Change"}
        </button>
      </form>
    </div>
  );
};

export default CreateChange;