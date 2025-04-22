const mongoose = require("mongoose");

const HealthMetricSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  metricType: { type: String, required: true }, // e.g., "blood_pressure", "glucose_level"
  value: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("HealthMetric", HealthMetricSchema);