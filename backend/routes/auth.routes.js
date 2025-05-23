const express = require("express");
const { register, login } = require("../controllers/auth.controller");

const router = express.Router();

// Register Route
router.post("/register", register);

// Login Route
router.post("/login", login);

module.exports = router;