import axios from "axios";
import { getToken } from "./auth";
const API_URL = "http://localhost:5000/api";

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  return response.data;
};

export const getMedicalRecords = async (patientId, token) => {
  const response = await axios.get(`${API_URL}/medical-records/patient/${patientId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getAppointmentsByDoctor = async (doctorId, token) => {
  const response = await axios.get(`${API_URL}/appointments/doctor/${doctorId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getNotificationsByUser = async (userId, token) => {
  const response = await axios.get(`${API_URL}/notifications/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getPlansByPatient = async (patientId, token) => {
  const response = await axios.get(`${API_URL}/treatment-plans/patient/${patientId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getAppointmentsByPatient = async (patientId, token) => {
  const response = await axios.get(`${API_URL}/appointments/patient/${patientId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getMessagesByUser = async (userId, token) => {
  const response = await axios.get(`${API_URL}/messages/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getAllUsers = async (token) => {
  const response = await axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
export const createMedicalRecord = async (patientId, recordType, description) => {
    try {
      const token = getToken();
      const response = await axios.post(
        "http://localhost:5000/api/medical-records",
        { patientId, recordType, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to create medical record", error);
      throw error;
    }
  };

  // Fetch medical records by patient ID
  export const fetchMedicalRecordsByPatient = async (patientId, token) => {
    try {
      if (!patientId) {
        throw new Error('Patient ID is required');
      }
  
      const response = await axios.get(`${API_BASE_URL}/medical-records/patient/${patientId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure you pass the authentication token
          'Content-Type': 'application/json',
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Failed to fetch medical records:', error);
      throw error;
    }
  };
  // Patient: Fetch their own medical records
