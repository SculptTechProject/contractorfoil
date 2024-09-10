import React, { useState } from "react";

interface ContractorFormProps {
  onAddContractor: (newContractor: any) => void; // Definiujemy, że prop to funkcja
}

const ContractorForm: React.FC<ContractorFormProps> = ({ onAddContractor }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nip, setNip] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [contactDate, setContactDate] = useState<Date | null>(null); // Stan na datę

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newContractor = { name, phone, nip, address, contactDate, notes };
    onAddContractor(newContractor); // Wywołujemy funkcję dodania kontrahenta
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Company Name"
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
      <input
        type="date"
        onChange={(e) => setContactDate(new Date(e.target.value))}
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
