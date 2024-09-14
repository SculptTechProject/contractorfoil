const express = require("express");
const {
  addContractor,
  getContractors,
  deleteContractor,
  updateContractor,
} = require("../controllers/contractorController"); // Import kontrolerów kontrahentów
const { protect } = require("../middleware/authMiddleware"); // Middleware chroniący trasy

const router = express.Router();

// Trasy chronione dla kontrahentów
// Dodawanie kontrahenta
router.post("/contractors", protect, addContractor);

// Pobieranie kontrahentów
router.get("/contractors", protect, getContractors);

// Usuwanie kontrahenta
router.delete("/contractors/:id", protect, deleteContractor);

// Aktualizacja kontrahenta
router.put("/contractors/:id", protect, updateContractor);

module.exports = router;
