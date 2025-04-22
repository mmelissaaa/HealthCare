const express = require("express");
const { createPlan, getPlansByPatient } = require("../controllers/treatment.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// Protected Routes
router.post("/", authMiddleware, createPlan);
router.get("/patient/:patientId", authMiddleware, getPlansByPatient);

module.exports = router;