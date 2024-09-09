import React, { useState } from "react";

interface ContractorFormProps {
  onAddContractor: (newContractor: any) => void;
}

const ContractorForm: React.FC<ContractorFormProps> = ({ onAddContractor }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nip, setNip] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newContractor = { name, phone, nip, address, notes };

    try {
      // Wywołanie funkcji przekazanej z nadrzędnego komponentu
      onAddContractor(newContractor);

      // Wyczyść formularz po dodaniu kontrahenta
      setName("");
      setPhone("");
      setNip("");
      setAddress("");
      setNotes("");
    } catch (error) {
      console.error("Failed to add contractor:", error);
    }
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
      <button type="submit">Add Contractor</button>
    </form>
  );
};

export default ContractorForm;
