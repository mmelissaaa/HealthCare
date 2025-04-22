import { useEffect, useState } from "react";
import { getAppointmentsByPatient } from "../utils/api";
import { getToken, getUserRole, getUserId } from "../utils/auth"; // Add getUserId

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const token = getToken();
  const patientId = getUserId(); // Get the patient ID from the token

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAppointmentsByPatient(patientId, token); // Pass the correct patient ID
        setAppointments(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [token, patientId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div key={appointment._id} className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold">{appointment.reason}</h2>
            <p>{new Date(appointment.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;