const express = require("express");
const { registerUser, loginUser, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Rejestracja użytkownika
router.post("/register", registerUser);

// Logowanie użytkownika
router.post("/login", loginUser);

// Trasa do pobrania informacji o zalogowanym użytkowniku
router.get("/me", protect, getMe);

module.exports = router;