const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Funkcja do generowania tokenu JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token ważny przez 30 dni
  });
};

// Rejestracja użytkownika
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Sprawdź, czy użytkownik już istnieje
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Utwórz nowego użytkownika
    const user = await User.create({
      email,
      password,
    });

    // Wyślij token JWT
    res.status(201).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user", error });
  }
};

// Logowanie użytkownika
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Znajdź użytkownika po emailu
    const user = await User.findOne({ email });

    // Sprawdź, czy użytkownik istnieje i czy hasło jest poprawne
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
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