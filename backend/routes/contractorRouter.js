const express = require("express");
const {
  addContractor,
  getContractors,
  deleteContractor,
  updateContractor,
} = require("../controllers/contractorController"); // Import kontrolerów
const { protect } = require("../middleware/authMiddleware"); // Middleware autoryzacyjny

const router = express.Router();

// Trasa do dodawania kontrahenta (POST)
router.post("/", protect, addContractor);

// Trasa do pobierania wszystkich kontrahentów (GET)
router.get("/", protect, getContractors);

// Trasa do aktualizowania kontrahenta (PUT)
router.put("/:id", protect, updateContractor);

// Trasa do usuwania kontrahenta (DELETE)
router.delete("/:id", protect, deleteContractor);

module.exports = router;