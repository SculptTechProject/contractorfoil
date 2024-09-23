const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Pobierz token z nagłówka
      token = req.headers.authorization.split(" ")[1];

      // Zweryfikuj token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Pobierz użytkownika z bazy danych, pomijając hasło
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error("Błąd weryfikacji tokenu:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };