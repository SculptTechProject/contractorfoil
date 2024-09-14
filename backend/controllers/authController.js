const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Rejestracja użytkownika
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("Podany email: ", email);
  console.log("Podane hasło: ", password);

  // Upewnij się, że email nie istnieje w bazie
  const trimmedEmail = email.trim(); // Usuwamy nadmiarowe spacje
  const userExists = await User.findOne({ email: trimmedEmail });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hashowanie hasła
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  console.log("Zhaszowane hasło:", hashedPassword);

  // Stworzenie nowego użytkownika
  const user = await User.create({
    email: trimmedEmail,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// Generowanie tokenu
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Logowanie użytkownika
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Przycinamy email przed dalszymi operacjami
  const trimmedEmail = email.trim();

  // Sprawdź, czy użytkownik istnieje
  const user = await User.findOne({ email: trimmedEmail });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  console.log("Email otrzymany w logowaniu:", trimmedEmail);
  console.log("Hasło otrzymane w logowaniu:", password);
  console.log("Hasło w bazie danych:", user.password);

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      console.error("Błąd podczas porównywania:", err);
    } else {
      console.log("Wynik porównania hasła:", result); // Sprawdź, czy porównanie daje true czy false
    }
  });


  // Sprawdź poprawność hasła
  const isMatch = await bcrypt.compare(password, user.password); // porównanie surowego hasła z zahashowanym
  console.log("Czy hasło jest poprawne:", isMatch);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Wygeneruj token JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
};



// Pobranie danych zalogowanego użytkownika
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user data", error });
  }
};

// Pobieranie wszystkich użytkowników (opcjonalnie, jeśli chcesz pokazać listę użytkowników)
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getUsers,
};
