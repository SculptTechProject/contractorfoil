import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchContractorById, updateContractor } from "../services/api";

const ContractorDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // id z URL
    const [contractor, setContractor] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false); // Dodanie stanu edycji
    const [formData, setFormData] = useState<any>({
        name: "",
        nip: "",
        phone: "",
        address: "",
        contactDate: "",
        notes: "",
    }); // Stany dla formularza
    const navigate = useNavigate();

    useEffect(() => {
        const loadContractorDetails = async () => {
            if (!id) {
                setError("No contractor ID found in the URL");
                setLoading(false);
                return;
            }

            try {
                const data = await fetchContractorById(id);
                setContractor(data);
                setFormData({
                    name: data.name,
                    nip: data.nip,
                    phone: data.phone,
                    address: data.address,
                    contactDate: data.contactDate,
                    notes: data.notes,
                });
            } catch (error) {
                setError("Failed to fetch contractor details");
            } finally {
                setLoading(false);
            }
        };

        loadContractorDetails();
    }, [id]);

    if (loading) {
        return <p className="text-center text-blue-500">Loading contractor details...</p>;
    }

    if (error) {
        return (
            <div className="text-center">
                <p className="text-red-500">{error}</p>
                <button
                    onClick={() => navigate("/dashboard")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Go Back to Dashboard
                </button>
            </div>
        );
    }

    if (!contractor) {
        return <p className="text-center text-gray-500">Contractor not found.</p>;
    }

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData: any) => ({ ...prevData, [name]: value }));
    };

    const handleSave = async () => {
        if (contractor && contractor._id) {
            try {
                const updatedContractor = await updateContractor(contractor._id, formData);
                alert("Contractor updated successfully!");
                setIsEditing(false);

                // Aktualizacja stanu kontrahenta po edycji
                setContractor(updatedContractor); // Bezpośrednia aktualizacja stanu
            } catch (error) {
                console.error("Failed to update contractor:", error);
            }
        }
    };

    const contactDate = new Date(contractor.contactDate).toLocaleDateString("pl-PL");

    // Link do Google Maps z zakodowanym adresem
    const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(contractor.address)}`;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">{contractor.name}</h1>

                {isEditing ? (
                    // Formularz edycji
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleFormChange}
                                placeholder="Company Name"
                                className="p-2 border border-gray-300 rounded-lg w-full"
                            />
                            <input
                                type="text"
                                name="nip"
                                value={formData.nip}
                                onChange={handleFormChange}
                                placeholder="NIP"
                                className="p-2 border border-gray-300 rounded-lg w-full"
                            />
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleFormChange}
                                placeholder="Phone"
                                className="p-2 border border-gray-300 rounded-lg w-full"
                            />
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleFormChange}
                                placeholder="Address"
                                className="p-2 border border-gray-300 rounded-lg w-full"
                            />
                            <input
                                type="date"
                                name="contactDate"
                                value={formData.contactDate.split("T")[0]}
                                onChange={handleFormChange}
                                className="p-2 border border-gray-300 rounded-lg w-full"
                            />
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleFormChange}
                                placeholder="Notes"
                                className="p-2 border border-gray-300 rounded-lg w-full"
                            />
                        </div>
                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                onClick={handleSave}
                                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                            >
                                Save Changes
                            </button>
                            <button
                                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
                                onClick={handleEditToggle}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    // Wyświetlanie szczegółów kontrahenta
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4 text-blue-600">Company Details</h2>
                            <p className="text-gray-800">
                                <strong>NIP:</strong> {contractor.nip}
                            </p>
                            <p className="text-gray-800">
                                <strong>Phone:</strong> {contractor.phone}
                            </p>
                            <p className="text-gray-800">
                                <strong>Address:</strong> {contractor.address}
                            </p>
                            <p className="text-gray-800">
                                <strong>Contact Date:</strong> {contactDate}
                            </p>
                            <p className="text-gray-800">
                                <strong>Notes:</strong> {contractor.notes}
                            </p>
                            {/* Dodaj przycisk przekierowujący do Google Maps */}
                            <a
                                href={googleMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                View on Google Maps
                            </a>
                        </div>

                        <div className="bg-green-100 p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4 text-green-600">Additional Information</h2>
                            <p className="text-gray-800">
                                <strong>Last updated:</strong> {new Date(contractor.updatedAt).toLocaleDateString("pl-PL")}
                            </p>
                            <p className="text-gray-800">
                                <strong>Created at:</strong> {new Date(contractor.createdAt).toLocaleDateString("pl-PL")}
                            </p>
                        </div>
                    </div>
                )}

                <div className="mt-6 flex justify-end space-x-4">
                    {!isEditing && (
                        <button
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                            onClick={handleEditToggle}
                        >
                            Edit Contractor
                        </button>
                    )}
                    <button
                        className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
                        onClick={() => navigate("/dashboard")}
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContractorDetails;