const MedicalRecord = require("../models/MedicalRecord");

// Create Medical Record
exports.createRecord = async (req, res) => {
  try {
    const { patientId, recordType, description } = req.body;
    const record = new MedicalRecord({ patientId, recordType, description });
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get Medical Records by Patient
exports.getRecordsByPatient = async (req, res) => {
  try {
    const records = await MedicalRecord.find({ patientId: req.params.patientId });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};