import React, { useState, useEffect } from "react";
import { addContractor, updateContractor } from "../services/api"; // Dodajemy funkcję do aktualizacji

interface ContractorFormProps {
  contractor?: any; // Możemy przekazać kontrahenta do edycji
  onAddContractor: (newContractor: any) => void;
  onUpdateContractor: (updatedContractor: any) => void;
}

const ContractorForm: React.FC<ContractorFormProps> = ({
  contractor,
  onAddContractor,
  onUpdateContractor,
}) => {
  const [name, setName] = useState(contractor ? contractor.name : "");
  const [phone, setPhone] = useState(contractor ? contractor.phone : "");
  const [nip, setNip] = useState(contractor ? contractor.nip : "");
  const [address, setAddress] = useState(contractor ? contractor.address : "");
  const [notes, setNotes] = useState(contractor ? contractor.notes : "");

  useEffect(() => {
    if (contractor) {
      setName(contractor.name);
      setPhone(contractor.phone);
      setNip(contractor.nip);
      setAddress(contractor.address);
      setNotes(contractor.notes);
    }
  }, [contractor]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newContractor = { name, phone, nip, address, notes };

    if (contractor) {
      try {
        const updated = await updateContractor(contractor._id, newContractor);
        onUpdateContractor(updated); // Wywołujemy aktualizację
      } catch (error) {
        console.error("Failed to update contractor:", error);
      }
    } else {
      try {
        const added = await addContractor(newContractor);
        onAddContractor(added); // Wywołujemy dodanie nowego kontrahenta
      } catch (error) {
        console.error("Failed to add contractor:", error);
      }
    }

    // Reset formularza po dodaniu/aktualizacji
    setName("");
    setPhone("");
    setNip("");
    setAddress("");
    setNotes("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="NIP"
        value={nip}
        onChange={(e) => setNip(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button type="submit">
        {contractor ? "Update Contractor" : "Add Contractor"}
      </button>
    </form>
  );
};

export default ContractorForm;
