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
    <div>
      <h2>Contractors List</h2>
      <ul>
        {contractors.length > 0 ? (
          contractors.map((contractor) => (
            <li key={contractor._id}>
              <strong>{contractor.name}</strong> - {contractor.phone},{" "}
              {contractor.address}
              <button onClick={() => onDeleteContractor(contractor._id)}>
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No contractors found</p>
        )}
      </ul>
    </div>
  );
};

export default ContractorsList;
