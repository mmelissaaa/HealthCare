import axios from "axios";
import { getToken } from "../utils/auth";

const fetchMedicalRecordsByPatient = async (patientId) => {
  try {
    const token = getToken();
    const response = await axios.get(
      `http://localhost:5000/api/medical-records/patient/${patientId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch medical records", error);
    throw error;
  }
};

// Example usage
const handleFetchRecords = async () => {
  try {
    const records = await fetchMedicalRecordsByPatient("67cc7dd72992a5e4d0888f8c");
    console.log("Medical records:", records);
  } catch (error) {
    console.error("Error fetching medical records:", error);
  }
};