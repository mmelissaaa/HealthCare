const express = require("express");
const { sendMessage, getMessagesByUser } = require("../controllers/message.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// Protected Routes
router.post("/", authMiddleware, sendMessage);
router.get("/user/:userId", authMiddleware, getMessagesByUser);

module.exports = router;