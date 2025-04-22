const express = require("express");
const { createNotification, getNotificationsByUser } = require("../controllers/notification.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// Protected Routes
router.post("/", authMiddleware, createNotification);
router.get("/user/:userId", authMiddleware, getNotificationsByUser);

module.exports = router;