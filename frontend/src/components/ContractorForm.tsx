import React, { useState, useEffect } from "react";

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
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [nip, setNip] = useState("");
    const [address, setAddress] = useState("");
    const [notes, setNotes] = useState("");
    const [contactDate, setContactDate] = useState("");

    useEffect(() => {
        if (contractor) {
            console.log("Editing contractor:", contractor); // Dodaj logowanie kontrahenta
            setName(contractor.name || "");
            setPhone(contractor.phone || "");
            setNip(contractor.nip || "");
            setAddress(contractor.address || "");
            setNotes(contractor.notes || "");
            setContactDate(contractor.contactDate ? contractor.contactDate.split("T")[0] : "");
        }
    }, [contractor]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newContractor = { name, phone, nip, address, notes, contactDate };

        if (contractor && contractor._id) {
            // Upewnij się, że ID kontrahenta jest przekazywane do edycji
            onUpdateContractor({ ...newContractor, _id: contractor._id });
        } else {
            onAddContractor(newContractor);
        }

        // Resetowanie formularza
        setName("");
        setPhone("");
        setNip("");
        setAddress("");
        setNotes("");
        setContactDate("");
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
            <h2 className="text-2xl font-semibold text-gray-700">
                {contractor ? "Update Contractor" : "Add Contractor"}
            </h2>
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                    type="text"
                    placeholder="NIP"
                    value={nip}
                    onChange={(e) => setNip(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <textarea
                    placeholder="Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                    type="date"
                    value={contactDate}
                    onChange={(e) => setContactDate(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
            </div>
            <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
                {contractor ? "Update Contractor" : "Add Contractor"}
            </button>
        </form>
    );
};

export default ContractorForm;