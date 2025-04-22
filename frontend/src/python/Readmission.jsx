import React, { useState } from "react";
import "./Readmission.css";

const Readmission = () => {
  const [formData, setFormData] = useState({
    age: "",
    time_in_hospital: "",
    n_inpatient: "",
    diag_1: "Circulatory",
    change: "no",
    diabetes_med: "no",
  });

  const [probability, setProbability] = useState(null);

  // Function to categorize age
  const categorizeAge = (age) => {
    if (age < 10) return "[0-10)";
    if (age < 20) return "[10-20)";
    if (age < 30) return "[20-30)";
    if (age < 40) return "[30-40)";
    if (age < 50) return "[40-50)";
    if (age < 60) return "[50-60)";
    if (age < 70) return "[60-70)";
    if (age < 80) return "[70-80)";
    return "[80-90)";
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert age to range
    const ageCategory = categorizeAge(parseInt(formData.age, 10));

    // Prepare data to send
    const patientData = {
      ...formData,
      age: ageCategory,
    };

    // Send request to backend for prediction
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      });

      const result = await response.json();
      setProbability(result.probability);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h2 className="form-title">Patient Readmission Predictor</h2>

        <form onSubmit={handleSubmit} className="prediction-form">
          {/* Age Input */}
          <div className="form-group">
            <label className="form-label">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter age (e.g., 72)"
              required
            />
          </div>

          {/* Time in Hospital */}
          <div className="form-group">
            <label className="form-label">Days in Hospital</label>
            <input
              type="number"
              name="time_in_hospital"
              value={formData.time_in_hospital}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter number of days"
              required
            />
          </div>

          {/* Number of Past Admissions */}
          <div className="form-group">
            <label className="form-label">Past Hospital Admissions</label>
            <input
              type="number"
              name="n_inpatient"
              value={formData.n_inpatient}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter past hospital admissions"
              required
            />
          </div>

          {/* Primary Diagnosis */}
          <div className="form-group">
            <label className="form-label">Primary Diagnosis</label>
            <select
              name="diag_1"
              value={formData.diag_1}
              onChange={handleChange}
              className="form-select"
            >
              <option value="Circulatory">Circulatory</option>
              <option value="Respiratory">Respiratory</option>
              <option value="Digestive">Digestive</option>
              <option value="Diabetes">Diabetes</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Change in Medication */}
          <div className="form-group">
            <label className="form-label">Change in Medication</label>
            <select
              name="change"
              value={formData.change}
              onChange={handleChange}
              className="form-select"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Diabetes Medication */}
          <div className="form-group">
            <label className="form-label">Diabetes Medication</label>
            <select
              name="diabetes_med"
              value={formData.diabetes_med}
              onChange={handleChange}
              className="form-select"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-button"
          >
            Predict Readmission Probability
          </button>
        </form>

        {/* Display Prediction */}
        {probability !== null && (
          <div className="result-card">
            <p className="result-title">Readmission Probability:</p>
            <p className="result-value">{(probability * 100).toFixed(2)}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Readmission;
