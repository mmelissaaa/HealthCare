const Patient = require("../models/Patient");

// Get Patient Profile
exports.getProfile = async (req, res) => {
  try {
    const patient = await Patient.findOne({ userId: req.user.id }).populate("userId");
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update Patient Profile
exports.updateProfile = async (req, res) => {
  try {
    const { medicalHistory, allergies, medications } = req.body;
    const patient = await Patient.findOneAndUpdate(
      { userId: req.user.id },
      { medicalHistory, allergies, medications },
      { new: true }
    );
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};