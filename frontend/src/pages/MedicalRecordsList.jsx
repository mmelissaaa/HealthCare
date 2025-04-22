import React, { useEffect, useState } from 'react';
import { fetchMedicalRecordsByPatient } from '../utils/api';

const MedicalRecordsList = ({ patientId, token }) => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const data = await fetchMedicalRecordsByPatient(patientId, token);
        setRecords(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (patientId) {
      fetchRecords();
    }
  }, [patientId, token]);

  return (
    <div>
      <h2>Medical Records</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {records.map((record) => (
          <li key={record.id}>{record.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default MedicalRecordsList;
