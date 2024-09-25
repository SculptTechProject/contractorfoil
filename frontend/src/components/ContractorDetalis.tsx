import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchContractorById } from "../services/api";

const ContractorDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // id z URL
    const [contractor, setContractor] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadContractorDetails = async () => {
            if (!id) { // Sprawdzamy, czy id istnieje
                setError("No contractor ID found in the URL");
                setLoading(false);
                return;
            }

            try {
                const data = await fetchContractorById(id);
                setContractor(data);
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

    const contactDate = new Date(contractor.contactDate).toLocaleDateString("pl-PL");

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">{contractor.name}</h1>
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

                <div className="mt-6 flex justify-end space-x-4">
                    <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                        Edit Contractor
                    </button>
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