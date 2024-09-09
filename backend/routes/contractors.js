const express = require("express");
const router = express.Router();
const Contractor = require("../models/Contractor");

// Create a new contractor
router.post("/", async (req, res) => {
  try {
    const contractor = new Contractor(req.body);
    await contractor.save();
    res.status(201).json(contractor);
  } catch (err) {
    res.status(500).json({ error: "Failed to create contractor" });
  }
});

// Get all contractors
router.get("/", async (req, res) => {
  try {
    const contractors = await Contractor.find();
    res.json(contractors);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve contractors" });
  }
});

// Get a specific contractor
router.get("/:id", async (req, res) => {
  try {
    const contractor = await Contractor.findById(req.params.id);
    if (!contractor) {
      return res.status(404).json({ error: "Contractor not found" });
    }
    res.json(contractor);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve contractor" });
  }
});

// Update a contractor
router.put("/:id", async (req, res) => {
  try {
    const contractor = await Contractor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!contractor) {
      return res.status(404).json({ error: "Contractor not found" });
    }
    res.json(contractor);
  } catch (err) {
    res.status(500).json({ error: "Failed to update contractor" });
  }
});

// Delete a contractor
router.delete("/:id", async (req, res) => {
  try {
    const contractor = await Contractor.findByIdAndDelete(req.params.id);
    if (!contractor) {
      return res.status(404).json({ error: "Contractor not found" });
    }
    res.json({ message: "Contractor deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete contractor" });
  }
});

module.exports = router;
