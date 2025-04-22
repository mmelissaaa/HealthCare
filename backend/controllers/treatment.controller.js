const TreatmentPlan = require("../models/TreatmentPlan");

// Create Treatment Plan
exports.createPlan = async (req, res) => {
  try {
    const { patientId, doctorId, diagnosis, prescription, notes } = req.body;
    const plan = new TreatmentPlan({ patientId, doctorId, diagnosis, prescription, notes });
    await plan.save();
    res.status(201).json(plan);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get Treatment Plans by Patient
exports.getPlansByPatient = async (req, res) => {
  try {
    const plans = await TreatmentPlan.find({ patientId: req.params.patientId });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};