const Contractor = require("../models/contractorModel");

// Dodawanie kontrahenta
const addContractor = async (req, res) => {
  const { name, phone, nip, address, contactDate, notes, priceColorless, priceColor, typeUnknown, priceUnknown } = req.body; // to add something else

  // Sprawdzenie, czy użytkownik jest dostępny z middleware 'protect'
  if (!req.user) {
    return res.status(400).json({ message: "User not found, token missing or invalid" });
  }

  try {
    const newContractor = await Contractor.create({ // to add something else
      name,
      phone,
      nip,
      address,
      contactDate,
      notes,
      priceColorless,
      priceColor,
      typeUnknown,
      priceUnknown,
      user: req.user._id, // Przypisanie użytkownika z middleware
    });

    res.status(201).json(newContractor);
  } catch (error) {
    res.status(500).json({ message: "Failed to add contractor", error });
  }
};

// Pobieranie kontrahentów
const getContractors = async (req, res) => {
  try {
    const contractors = await Contractor.find({ user: req.user._id });
    res.status(200).json(contractors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contractors", error });
  }
};

// Usuwanie kontrahenta
const deleteContractor = async (req, res) => {
  const contractorId = req.params.id;

  try {
    const contractor = await Contractor.findById(contractorId);

    if (!contractor || contractor.user.toString() !== req.user._id.toString()) {
      return res
          .status(404)
          .json({ message: "Contractor not found or not authorized" });
    }

    // Używamy deleteOne zamiast remove
    await contractor.deleteOne();
    res.status(200).json({ message: "Contractor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete contractor", error });
  }
};


// Aktualizowanie kontrahenta
const updateContractor = async (req, res) => {
  const contractorId = req.params.id;

  try {
    const contractor = await Contractor.findById(contractorId);

    if (!contractor || contractor.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Contractor not found or not authorized" });
    }

    const updatedContractor = await Contractor.findByIdAndUpdate(
        contractorId,
        req.body,
        { new: true, runValidators: true }
    );

    res.status(200).json(updatedContractor);
  } catch (error) {
    res.status(500).json({ message: "Failed to update contractor", error });
  }
};

// Pobieranie kontrahenta po ID
const getContractorById = async (req, res) => {
  try {
    const contractor = await Contractor.findById(req.params.id);

    if (!contractor) {
      return res.status(404).json({ message: 'Contractor not found' });
    }

    res.status(200).json(contractor);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch contractor', error });
  }
};


module.exports = {
  addContractor,
  getContractors,
  deleteContractor,
  updateContractor,
  getContractorById
};