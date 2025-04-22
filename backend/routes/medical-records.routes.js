const express = require("express");
const { createRecord, getRecordsByPatient } = require("../controllers/medical.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// Protected Routes
router.post("/", authMiddleware, createRecord);
router.get("/patient/:patientId", authMiddleware, getRecordsByPatient);

module.exports = router;