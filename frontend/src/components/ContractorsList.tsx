import React from "react";
import { Link } from "react-router-dom";
import "../CSS/ContractorList.css";

interface Contractor {
  _id: string;
  name: string;
  nip: string;
  phone: string;
  address: string;
  contactDate: string;
  priceColorless?: number;
  priceColor?: number;
  priceUnknown?: number;
  typeUnknown?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface ContractorsListProps {
  contractors: Contractor[];
  onDeleteContractor: (id: string) => void;
  onEditContractor: (contractor: Contractor) => void;
  className: string;
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
    <div className="max-w-5xl mx-auto mt-5 max-h-6">
      <ul className="space-y-4">
        {sortedContractors.length > 0 ? (
          sortedContractors.map((contractor) => {
            const contactDate = new Date(contractor.contactDate);
            const timeDifference = contactDate.getTime() - today.getTime();
            const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));

            const backgroundColor = daysLeft <= 4 ? "bg-red-100" : "bg-white";
            const borderColor =
              daysLeft <= 4 ? "border-red-400" : "border-gray-300";

            return (
              <li
                className={`p-4 border-l-4 shadow-md rounded-lg ${backgroundColor} ${borderColor}`}
                key={contractor._id}
              >
                <div className="w-full p-4 mx-auto rounded-lg max-w-7xl">
                  <div className="grid items-start gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {/* Informacje o kontrahencie */}
                    <div className="col-span-2">
                      <h3 className="mb-2 text-lg font-semibold">
                        {contractor.name}
                      </h3>
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
                        <strong>Price FOD Colorless:</strong>{" "}
                        {contractor.priceColorless
                          ? `${contractor.priceColorless.toFixed(2)} zł/kg`
                          : "No price"}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Price FOD Color:</strong>{" "}
                        {contractor.priceColor
                          ? `${contractor.priceColor.toFixed(2)} zł/kg`
                          : "No price"}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>
                          {contractor.typeUnknown
                            ? `${contractor.typeUnknown.toString()}`
                            : "No type"}
                          :
                        </strong>{" "}
                        {contractor.priceUnknown
                          ? `${contractor.priceUnknown.toFixed(2)} zł/kg`
                          : "No price"}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Date:</strong>{" "}
                        {contactDate.toLocaleDateString("pl-PL")}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Notes:</strong>{" "}
                        {contractor.notes || "No notes available"}
                      </p>
                    </div>

                    {/* Przyciski */}
                    <div className="flex flex-col space-y-3">
                      <Link
                        to={`/contractors/${contractor._id}`}
                        className="px-4 py-2 text-center text-white transition-all duration-200 ease-in-out bg-green-500 rounded-lg hover:bg-green-600"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => onEditContractor(contractor)}
                        className="px-4 py-2 text-center text-white transition-all duration-200 ease-in-out bg-blue-500 rounded-lg hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDeleteContractor(contractor._id)}
                        className="px-4 py-2 text-center text-white transition-all duration-200 ease-in-out bg-red-500 rounded-lg hover:bg-red-600"
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
          <p className="text-center text-gray-500">No contractors found.</p>
        )}
      </ul>
    </div>
  );
};

export default ContractorsList;
