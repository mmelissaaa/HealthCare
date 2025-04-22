import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewTreatmentPlans = ({ patientId }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/treatment-plans/patient/${patientId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPlans(response.data);
      } catch (error) {
        console.error("Failed to fetch treatment plans", error);
      }
    };

    fetchPlans();
  }, [patientId]);

  return (
    <div>
      <h1>Treatment Plans for Patient {patientId}</h1>
      {plans.length > 0 ? (
        <ul>
          {plans.map((plan) => (
            <li key={plan._id}>
              <h3>Diagnosis: {plan.diagnosis}</h3>
              <p>Prescription: {plan.prescription}</p>
              <p>Notes: {plan.notes}</p>
              <p>Created by Doctor: {plan.doctorId}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No treatment plans found for this patient.</p>
      )}
    </div>
  );
};

export default ViewTreatmentPlans;