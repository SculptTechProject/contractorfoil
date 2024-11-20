import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaInfoCircle, FaTrashAlt } from "react-icons/fa";

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
    return dateA - dateB;
  });

  return (
    <div className="px-4 mx-auto mt-5 max-w-7xl">
      {sortedContractors.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {sortedContractors.map((contractor) => {
            const contactDate = new Date(contractor.contactDate);
            const timeDifference = contactDate.getTime() - today.getTime();
            const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));

            const isUrgent = daysLeft <= 4;

            return (
              <div
                key={contractor._id}
                className={`bg-white shadow-md rounded-lg overflow-hidden ${
                  isUrgent
                    ? "border-l-4 border-red-500 bg-red-100"
                    : "border border-gray-200"
                }`}
              >
                <div className="flex flex-col h-full p-6">
                  {/* Nazwa kontrahenta */}
                  <h3 className="mb-2 text-xl font-semibold text-gray-800">
                    {contractor.name}
                  </h3>

                  {/* Szczegóły kontrahenta */}
                  <div className="flex-grow mb-4 text-gray-600 text-md">
                    <p>
                      <span className="font-medium">NIP:</span> {contractor.nip}
                    </p>
                    <p>
                      <span className="font-medium">Contact:</span>{" "}
                      {contractor.phone}
                    </p>
                    <p>
                      <span className="font-medium">Address:</span>{" "}
                      {contractor.address}
                    </p>
                    <p>
                      <span className="font-medium">Price FOD Colorless:</span>{" "}
                      {contractor.priceColorless
                        ? `${contractor.priceColorless.toFixed(2)} zł/kg`
                        : "No price"}
                    </p>
                    <p>
                      <span className="font-medium">Price FOD Color:</span>{" "}
                      {contractor.priceColor
                        ? `${contractor.priceColor.toFixed(2)} zł/kg`
                        : "No price"}
                    </p>
                    {contractor.typeUnknown && (
                      <p>
                        <span className="font-medium">
                          {contractor.typeUnknown}:
                        </span>{" "}
                        {contractor.priceUnknown
                          ? `${contractor.priceUnknown.toFixed(2)} zł/kg`
                          : "No price"}
                      </p>
                    )}
                    <p>
                      <span className="font-medium">Date:</span>{" "}
                      {contactDate.toLocaleDateString("pl-PL")}
                    </p>
                    <p>
                      <span className="font-medium">Notes:</span>{" "}
                      {contractor.notes || "No notes available"}
                    </p>
                  </div>

                  {/* Przyciski akcji */}
                  <div className="flex items-center justify-between mt-4">
                    {/* Przycisk "Open in Maps" */}
                    <a
                      href={`https://www.google.com/maps?q=${encodeURIComponent(
                        contractor.address
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 transition duration-200 border border-blue-600 rounded-md hover:bg-blue-100"
                    >
                      <FaMapMarkerAlt className="mr-2" />
                      Map
                    </a>

                    {/* Przycisk "Details" */}
                    <Link
                      to={`/contractors/${contractor._id}`}
                      className="flex items-center px-3 py-2 text-sm font-medium text-green-600 transition duration-200 border border-green-600 rounded-md hover:bg-green-100"
                    >
                      <FaInfoCircle className="mr-2" />
                      Details
                    </Link>

                    {/* Przycisk "Delete" */}
                    <button
                      onClick={() => onDeleteContractor(contractor._id)}
                      className="flex items-center px-3 py-2 text-sm font-medium text-red-600 transition duration-200 bg-red-200 border border-red-600 rounded-md hover:bg-red-100"
                    >
                      <FaTrashAlt className="mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500">No contractors found.</p>
      )}
    </div>
  );
};

export default ContractorsList;
