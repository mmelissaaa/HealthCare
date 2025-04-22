const mongoose = require("mongoose");

const CaregiverSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  qualifications: { type: String, default: "" },
  experience: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Caregiver", CaregiverSchema);