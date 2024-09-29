import React, { useEffect, useState } from "react";

interface ContractorFormProps {
    contractor?: any; // Opcjonalny kontrahent do edycji
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
    const [priceColorless, setPriceColorless] = useState(contractor ? contractor.priceColorless : "");
    const [priceColor, setPriceColor] = useState(contractor ? contractor.priceColor : "");
    const [notes, setNotes] = useState(contractor ? contractor.notes : "");
    const [contactDate, setContactDate] = useState(
        contractor ? contractor.contactDate : ""
    );
    // Wypełnienie formularza danymi kontrahenta przy edycji
    useEffect(() => {
        if (contractor) {
            setName(contractor.name);
            setPhone(contractor.phone);
            setNip(contractor.nip);
            setAddress(contractor.address);
            setPriceColorless(contractor.priceColorless);
            setPriceColor(contractor.priceColor);
            setNotes(contractor.notes);
            setContactDate(contractor.contactDate);
        }
    }, [contractor]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newContractor = { name, phone, nip, address, priceColorless, priceColor, notes, contactDate };

        if (contractor && contractor._id) {
            // Jeśli jest edytowany kontrahent, wywołujemy funkcję aktualizacji
            onUpdateContractor({ ...newContractor, _id: contractor._id });
        } else {
            // Jeśli nie ma kontrahenta, dodajemy nowego
            onAddContractor(newContractor);
        }

        // Resetowanie formularza po dodaniu/aktualizacji
        setName("");
        setPhone("");
        setNip("");
        setAddress("");
        setPriceColorless("");
        setPriceColor("");
        setNotes("");
        setContactDate("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Phone</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium">NIP</label>
                <input
                    type="text"
                    value={nip}
                    onChange={(e) => setNip(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Address</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Contact Date</label>
                <input
                    type="date"
                    value={contactDate ? contactDate.substring(0, 10) : ""}
                    onChange={(e) => setContactDate(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Price FOD Colorless</label>
                <input
                    type="number"
                    value={priceColorless}
                    onChange={(e) => setPriceColorless(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded-md"
                    placeholder="zł/kg Colorless"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Price FOD Color</label>
                <input
                    type="number"
                    value={priceColor}
                    onChange={(e) => setPriceColor(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded-md"
                    placeholder="zł/kg Color"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Notes</label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            >
                {contractor ? "Update Contractor" : "Add Contractor"}
            </button>
        </form>
    );
};

export default ContractorForm;