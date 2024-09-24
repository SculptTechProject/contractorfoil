const express = require("express");
const {
  addContractor,
  getContractors,
  deleteContractor,
  updateContractor,
} = require("../controllers/contractorController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Trasa do dodawania kontrahenta
router.post("/", protect, addContractor);

// Trasa do pobierania kontrahentów
router.get("/", protect, getContractors);

// Trasa do usuwania kontrahenta
router.delete("/:id", protect, deleteContractor);

// Trasa do aktualizowania kontrahenta
router.put("/:id", protect, updateContractor);

module.exports = router;