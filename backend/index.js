const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const contractorsRouter = require("./routes/contractorRouter");
const authRouter = require("./routes/authRouter");

dotenv.config(); // Load environment variables from .env

const app = express();

// CORS Middleware to dynamically allow requests based on environment
app.use(cors({
    origin: ['https://contractorfoil.vercel.app'/*'http://localhost:3000'*/],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json()); // Middleware to parse JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit process if MongoDB connection fails
    });

// Auth routes (register, login)
app.use("/api/auth", authRouter);

// Contractor routes
app.use("/api/contractors", contractorsRouter);

// Basic route for health check
app.get("/", (req, res) => {
    res.send("ContractorFoil API is running");
});

// Catch-all for non-existent routes (404)
app.use((req, res, next) => {
    res.status(404).json({ message: "API route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error", error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000; // Default to port 5000 if not specified
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});