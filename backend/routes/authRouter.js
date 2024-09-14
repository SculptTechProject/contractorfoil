const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { getUsers, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Trasa do rejestracji użytkownika
router.post("/register", registerUser);

// Trasa do logowania użytkownika
router.post("/login", loginUser);

// Trasa do pobierania zalogowanego użytkownika
router.get('/me', protect, getMe);

// Trasa do pobierania wszystkich użytkowników
router.get('/users', protect, getUsers);

module.exports = router;