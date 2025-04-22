const mongoose = require("mongoose");

const MedicalRecordSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  recordType: { type: String, required: true }, // e.g., "diagnosis", "lab_result"
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MedicalRecord", MedicalRecordSchema);