const HospitalChange = require("../models/HospitalChange");

// Create Hospital Change
exports.createChange = async (req, res) => {
  try {
    const { title, description } = req.body;
    const change = new HospitalChange({ title, description });
    await change.save();
    res.status(201).json(change);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get All Hospital Changes
exports.getAllChanges = async (req, res) => {
  try {
    const changes = await HospitalChange.find();
    res.json(changes);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};