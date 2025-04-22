const Caregiver = require("../models/Caregiver");

// Get Caregiver Profile
exports.getProfile = async (req, res) => {
  try {
    const caregiver = await Caregiver.findOne({ userId: req.user.id }).populate("userId");
    if (!caregiver) return res.status(404).json({ message: "Caregiver not found" });
    res.json(caregiver);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update Caregiver Profile
exports.updateProfile = async (req, res) => {
  try {
    const { qualifications, experience } = req.body;
    const caregiver = await Caregiver.findOneAndUpdate(
      { userId: req.user.id },
      { qualifications, experience },
      { new: true }
    );
    res.json(caregiver);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};