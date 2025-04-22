const express = require("express");
const { createChange, getAllChanges } = require("../controllers/hospital.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// Protected Routes
router.post("/", authMiddleware, createChange);
router.get("/", authMiddleware, getAllChanges);

module.exports = router;