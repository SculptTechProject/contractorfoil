import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchContractorById } from "../services/api"; // Funkcja do pobierania kontrahenta po ID

const ContractorDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Pobieramy ID kontrahenta z URL
    console.log("ID from URL:", id);
    const [contractor, setContractor] = useState<any | null>(null);

    useEffect(() => {
        if (id) {
            const loadContractorDetails = async () => {
                try {
                    const data = await fetchContractorById(id);
                    console.log("Contractor data:", data); // Sprawdź dane w konsoli
                    setContractor(data);
                } catch (error) {
                    console.error("Failed to fetch contractor details:", error);
                }
            };
            loadContractorDetails();
        }
    }, [id]);

    useEffect(() => {
        console.log("ID from URL:", id);  // Sprawdzenie, czy ID nie jest undefined
    }, [id]);

    if (!contractor) {
        return <p>Loading...</p>;
    }

    if (!id){
        return <p>No contractor ID provided.</p>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-8 shadow-lg rounded-lg bg-white">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {contractor.name} - Contractor Details
            </h1>
            <p><strong>NIP: </strong>{contractor.nip}</p>
            <p><strong>Phone: </strong>{contractor.phone}</p>
            <p><strong>Address: </strong>{contractor.address}</p>
            <p><strong>Contact Date: </strong>{new Date(contractor.contactDate).toLocaleDateString("pl-PL")}</p>
            <p><strong>Notes: </strong>{contractor.notes}</p>

            {/* Link do Google Maps */}
            <div className="mt-4">
                <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contractor.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                >
                    View on Google Maps
                </a>
            </div>

            {/* Przycisk do edytowania kontrahenta */}
            <div className="mt-6">
                <Link
                    to={`/edit/${contractor._id}`}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Edit Contractor
                </Link>
            </div>

            {/* Przycisk powrotu do listy kontrahentów */}
            <div className="mt-4">
                <Link
                    to="/dashboard"
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    Back to Contractors List
                </Link>
            </div>
        </div>
    );
};

export default ContractorDetails;