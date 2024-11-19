import React, { useEffect, useState } from "react";
import { FaSave, FaEdit } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

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

  /* Prices */
  const [priceColorless, setPriceColorless] = useState(
    contractor ? contractor.priceColorless : ""
  );
  const [priceColor, setPriceColor] = useState(
    contractor ? contractor.priceColor : ""
  );
  const [priceUnknown, setPriceUnknown] = useState(
    contractor ? contractor.priceUnknown : ""
  );
  const [typeUnknown, setTypeUnknown] = useState(
    contractor ? contractor.typeUnknown : ""
  );

  const [notes, setNotes] = useState(contractor ? contractor.notes : "");
  const [contactDate, setContactDate] = useState(
    contractor ? contractor.contactDate : ""
  );

  // Inicjalizacja AOS
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Wypełnienie formularza danymi kontrahenta przy edycji
  useEffect(() => {
    if (contractor) {
      setName(contractor.name);
      setPhone(contractor.phone);
      setNip(contractor.nip);
      setAddress(contractor.address);
      setPriceColorless(contractor.priceColorless);
      setPriceColor(contractor.priceColor);
      setPriceUnknown(contractor.priceUnknown);
      setTypeUnknown(contractor.typeUnknown);
      setNotes(contractor.notes);
      setContactDate(contractor.contactDate);
    } else {
      // Resetuj formularz, gdy nie edytujemy kontrahenta
      setName("");
      setPhone("");
      setNip("");
      setAddress("");
      setPriceColorless("");
      setPriceColor("");
      setPriceUnknown("");
      setTypeUnknown("");
      setNotes("");
      setContactDate("");
    }
  }, [contractor]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newContractor = {
      name,
      phone,
      nip,
      address,
      priceColorless,
      priceColor,
      typeUnknown,
      priceUnknown,
      notes,
      contactDate,
    };

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
    setTypeUnknown("");
    setPriceUnknown("");
    setNotes("");
    setContactDate("");
  };

    return (
      <div className="px-6 py-16 bg-white rounded-lg shadow mt-15">
        <form onSubmit={handleSubmit} className="space-y-6" data-aos="fade-up">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            {contractor ? "Edit Contractor" : "Add Contractor"}
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full mt-1 border-gray-800 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter company name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="block w-full mt-1 border-gray-800 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter phone number"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                NIP
              </label>
              <input
                type="text"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
                className="block w-full mt-1 border-gray-800 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter NIP"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="block w-full mt-1 border-gray-800 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter address"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Date
              </label>
              <input
                type="date"
                value={contactDate ? contactDate.substring(0, 10) : ""}
                onChange={(e) => setContactDate(e.target.value)}
                className="block w-full mt-1 border-gray-800 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price FOD Colorless (zł/kg)
                </label>
                <input
                  type="number"
                  value={priceColorless}
                  onChange={(e) => setPriceColorless(e.target.value)}
                  className="block w-full mt-1 border-gray-800 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="e.g., 10.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price FOD Color (zł/kg)
                </label>
                <input
                  type="number"
                  value={priceColor}
                  onChange={(e) => setPriceColor(e.target.value)}
                  className="block w-full mt-1 border-gray-800 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="e.g., 8.50"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  FOD Type
                </label>
                <input
                  type="text"
                  value={typeUnknown}
                  onChange={(e) => setTypeUnknown(e.target.value)}
                  className="block w-full mt-1 border-gray-800 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter FOD type"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price FOD Type Unknown (zł/kg)
                </label>
                <input
                  type="number"
                  value={priceUnknown}
                  onChange={(e) => setPriceUnknown(e.target.value)}
                  className="block w-full mt-1 border-gray-800 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="e.g., 12.00"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="block w-full mt-1 border-gray-800 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Additional information"
                rows={4}
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex items-center justify-center w-full px-4 py-4 text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {contractor ? (
              <>
                <FaEdit className="mr-2" />
                Update Contractor
              </>
            ) : (
              <>
                <FaSave className="mr-2" />
                Add Contractor
              </>
            )}
          </button>
        </form>
      </div>
    );
};

export default ContractorForm;
