const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const contractorsRouter = require("./routes/contractors"); // Import your routes

dotenv.config(); // Load environment variables from .env file

const app = express(); // Initialize Express app

app.use(cors()); // Dodaje wsparcie dla CORS
app.use(express.json()); // Middleware to parse JSON

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use your contractors routes here, after initializing the app
app.use("/api/contractors", contractorsRouter);

// Simple route for testing
app.get("/", (req, res) => {
  res.send("ContractorFoil API is running");
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
