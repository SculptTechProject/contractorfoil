const express = require("express");
const { registerUser } = require("../controllers/authController");
const router = express.Router();

router.post("/register", registerUser); // Trasa do rejestracji

module.exports = router;
