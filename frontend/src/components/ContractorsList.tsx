import React from "react";

interface ContractorsListProps {
  contractors: any[];
  onDeleteContractor: (id: string) => void;
}

const ContractorsList: React.FC<ContractorsListProps> = ({
  contractors,
  onDeleteContractor,
}) => {
  return (
    <div className="flex justify-center py-8">
      <ul className="py-8">
        {contractors.length > 0 ? (
          contractors.map((contractor) => (
            <li className="" key={contractor._id}>
              <strong>{contractor.name}</strong> - {contractor.nip} -{" "}
              {contractor.phone} | {contractor.address} | {contractor.notes} |{" "}
              <strong>
                {contractor.contactDate
                  ? // Formatowanie daty tutaj
                    new Date(contractor.contactDate).toLocaleDateString(
                      "pl-PL",
                      {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }
                    )
                  : "No contact date"}{" "}
              </strong>
              |{" "}
              <button
                className="px-5 py-3 mx-8 bg-red-400 text-"
                onClick={() => onDeleteContractor(contractor._id)}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p className="text-red-600">No contractors found</p>
        )}
      </ul>
    </div>
  );
};

export default ContractorsList;
