const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const contractorsRouter = require("./routes/contractorRouter"); // Import routera kontrahentów
const authRouter = require("./routes/authRouter"); // Import routera autoryzacyjnego

dotenv.config(); // Wczytanie zmiennych środowiskowych z pliku .env

const app = express(); // Inicjalizacja aplikacji Express

app.use(cors()); // Dodanie wsparcia dla CORS
app.use(express.json()); // Middleware do parsowania JSON

// Połączenie z MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Trasy autoryzacyjne (rejestracja, logowanie)
app.use("/api/auth", authRouter);

// Trasy kontrahentów
app.use("/api/contractors", contractorsRouter);

// Prosta trasa testowa
app.get("/", (req, res) => {
  res.send("ContractorFoil API is running");
});

// Uruchomienie serwera
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
