const Doctor = require("../models/Doctor");

// Get Doctor Profile
exports.getProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user.id }).populate("userId");
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update Doctor Profile
exports.updateProfile = async (req, res) => {
  try {
    const { specialization, qualifications, experience } = req.body;
    const doctor = await Doctor.findOneAndUpdate(
      { userId: req.user.id },
      { specialization, qualifications, experience },
      { new: true }
    );
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};