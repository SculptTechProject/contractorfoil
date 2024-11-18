const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const axios = require("axios");

// Funkcja do generowania tokenu JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token ważny przez 30 dni
  });
};

// Rejestracja użytkownika
const registerUser = async (req, res) => {
  const { name, email, password, captchaToken } = req.body;
  const useRecaptcha = process.env.USE_RECAPTCHA === "true";

  if (useRecaptcha) {
    if (!captchaToken) {
      return res.status(400).json({ message: "Captcha is required" });
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;

    try {
      const response = await axios.post(verifyUrl);
      const { success, score } = response.data;

      if (!success || score < 0.5) {
        return res.status(400).json({ message: "Captcha verification failed" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Captcha verification failed", error });
    }
  }

  // Kontynuuj z rejestracją użytkownika
  try {
    // Sprawdź, czy użytkownik już istnieje
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Utwórz nowego użytkownika
    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user", error });
  }
};

// Logowanie użytkownika
const loginUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Znajdź użytkownika po emailu
    const user = await User.findOne({ email });

    // Sprawdź, czy użytkownik istnieje i czy hasło jest poprawne
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to login user", error });
  }
};

// Pobieranie zalogowanego użytkownika
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user", error });
  }
};

// Eksportowanie funkcji kontrolera
module.exports = {
  registerUser,
  loginUser,
  getMe,
};