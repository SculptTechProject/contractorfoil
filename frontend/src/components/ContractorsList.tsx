import React from "react";
import { Link } from "react-router-dom";
import "../CSS/ContractorList.css";

interface ContractorsListProps {
    contractors: any[];
    onDeleteContractor: (id: string) => void;
    onEditContractor: (contractor: any) => void;
}

const ContractorsList: React.FC<ContractorsListProps> = ({
                                                             contractors,
                                                             onDeleteContractor,
                                                             onEditContractor,
                                                         }) => {
    const today = new Date();

    // Sortowanie kontrahentów według daty kontaktu
    const sortedContractors = contractors.sort((a, b) => {
        const dateA = new Date(a.contactDate).getTime();
        const dateB = new Date(b.contactDate).getTime();
        return dateA - dateB; // Im mniejsza wartość, tym wyżej w liście
    });

    return (
        <div className="max-w-5xl max-h-max mx-auto mt-8">
            <ul className="space-y-4">
                {sortedContractors.length > 0 ? (
                    sortedContractors.map((contractor) => {
                        const contactDate = new Date(contractor.contactDate);
                        const timeDifference = contactDate.getTime() - today.getTime();
                        const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));

                        const backgroundColor = daysLeft <= 4 ? "bg-red-100" : "bg-white";
                        const borderColor = daysLeft <= 4 ? "border-red-400" : "border-gray-300";

                        return (
                            <li
                                className={`p-4 border-l-4 shadow-md rounded-lg ${backgroundColor} ${borderColor}`}
                                key={contractor._id}
                            >
                                <div className="max-w-7xl w-full mx-auto p-4 rounded-lg">
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                                        {/* Informacje o kontrahencie */}
                                        <div className="col-span-2">
                                            <h3 className="text-lg font-semibold mb-2">{contractor.name}</h3>
                                            <p className="text-sm text-gray-500">
                                                <strong>NIP:</strong> {contractor.nip}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                <strong>Contact:</strong> {contractor.phone}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                <strong>Address:</strong> {contractor.address}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                <strong>Price:</strong> {contractor.price}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                <strong>Date:</strong> {contactDate.toLocaleDateString("pl-PL")}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                <strong>Notes:</strong> {contractor.notes || "No notes available"}
                                            </p>
                                        </div>

                                        {/* Przyciski */}
                                        <div className="flex flex-col space-y-3">
                                        <Link
                                                to={`/contractors/${contractor._id}`}
                                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 ease-in-out text-center"
                                            >
                                                Details
                                            </Link>
                                            <button
                                                onClick={() => onEditContractor(contractor)}
                                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 ease-in-out text-center"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => onDeleteContractor(contractor._id)}
                                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 ease-in-out text-center"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })
                ) : (
                    <p className="text-gray-500 text-center">No contractors found.</p>
                )}
            </ul>
        </div>
    );
};

export default ContractorsList;