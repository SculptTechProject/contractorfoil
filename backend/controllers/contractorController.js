const Contractor = require("../models/contractorModel");

// Dodawanie kontrahenta
export const addContractor = async (contractor: any) => {
  const token = localStorage.getItem("userToken");

  const response = await fetch("http://localhost:5173/api/contractors", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(contractor),
  });

  if (!response.ok) {
    const errorMessage = await response.text(); // Odczytaj odpowiedź jako tekst tylko raz
    console.error("Error response:", errorMessage); // Zaloguj błąd
    throw new Error("Failed to add contractor");
  }

  const data = await response.json(); // Odczyt strumienia odpowiedzi jako JSON tylko raz
  return data;
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
    console.log("Deleting contractor with ID:", contractorId); // Logowanie ID kontrahenta

    const contractor = await Contractor.findById(contractorId);

    if (!contractor) {
      console.log("Contractor not found"); // Kontrahent nie znaleziony
      return res
          .status(404)
          .json({ message: "Contractor not found or not authorized" });
    }

    if (contractor.user.toString() !== req.user._id.toString()) {
      console.log("User not authorized to delete this contractor"); // Nieautoryzowany użytkownik
      return res
          .status(404)
          .json({ message: "Contractor not found or not authorized" });
    }

    await contractor.remove();
    res.status(200).json({ message: "Contractor deleted successfully" });
  } catch (error) {
    console.error("Error deleting contractor:", error);
    res.status(500).json({ message: "Failed to delete contractor", error });
  }
};

// Aktualizowanie kontrahenta
const updateContractor = async (req, res) => {
  const contractorId = req.params.id;

  try {
    const contractor = await Contractor.findById(contractorId);

    if (!contractor || contractor.user.toString() !== req.user._id) {
      return res
          .status(404)
          .json({ message: "Contractor not found or not authorized" });
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


module.exports = {
  addContractor,
  getContractors,
  deleteContractor,
  updateContractor,
};