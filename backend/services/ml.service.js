const axios = require('axios');
const config = require('../config/config');
const Patient = require('../models/Patient');
const MedicalRecord = require('../models/MedicalRecord');
const TreatmentPlan = require('../models/TreatmentPlan');

// Enhance medical records with ML insights
exports.enhanceMedicalRecords = async (records) => {
  try {
    // Send records to ML model for analysis
    const response = await axios.post(`${config.mlServiceUrl}/analyze-records`, {
      records
    });

    // Add ML insights to records
    return records.map((record, index) => ({
      ...record.toObject(),
      mlInsights: response.data.insights[index]
    }));
  } catch (error) {
    console.error('Enhance medical records error:', error);
    return records; // Return original records if ML service fails
  }
};

// Generate treatment recommendations using ML
exports.getRecommendedTreatment = async (patientId, condition) => {
  try {
    // Fetch patient data
    const patient = await Patient.findById(patientId).populate('medicalRecords');
    if (!patient) {
      throw new Error('Patient not found');
    }

    // Send patient data to ML model
    const response = await axios.post(`${config.mlServiceUrl}/recommend-treatment`, {
      patient: patient.toObject(),
      condition
    });

    return response.data.recommendations;
  } catch (error) {
    console.error('Get recommended treatment error:', error);
    return {}; // Return empty object if ML service fails
  }
};

// Generate treatment plan analytics
exports.generateTreatmentPlanAnalytics = async (treatmentPlan) => {
  try {
    // Send treatment plan data to ML model
    const response = await axios.post(`${config.mlServiceUrl}/generate-analytics`, {
      treatmentPlan: treatmentPlan.toObject()
    });

    return response.data.analytics;
  } catch (error) {
    console.error('Generate treatment plan analytics error:', error);
    return {}; // Return empty object if ML service fails
  }
};