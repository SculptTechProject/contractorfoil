const Contractor = require("../models/contractor");

// Funkcja dodawania nowego kontrahenta
exports.addContractor = async (req, res) => {
  try {
    // Tworzymy nowego kontrahenta na podstawie danych z body requestu
    const newContractor = new Contractor({
      name: req.body.name,
      phone: req.body.phone,
      nip: req.body.nip,
      address: req.body.address,
      contactDate: new Date(req.body.contactDate), // Konwersja daty z formatu string na Date
      notes: req.body.notes,
    });

    const savedContractor = await newContractor.save();
    res.status(201).json(savedContractor); // Zwracamy zapisany obiekt jako JSON
  } catch (error) {
    res.status(400).json({ message: "Failed to add contractor", error });
  }
};
