const express = require("express");
const { createAppointment, getAppointmentsByPatient } = require("../controllers/appointment.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// Protected Routes
router.post("/", authMiddleware, createAppointment);
router.get("/patient/:patientId", authMiddleware, getAppointmentsByPatient);

module.exports = router;