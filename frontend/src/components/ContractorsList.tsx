import React from "react";

interface ContractorsListProps {
  contractors: any[];
  onDeleteContractor: (id: string) => void;
}

const ContractorsList: React.FC<ContractorsListProps> = ({
  contractors,
  onDeleteContractor,
}) => {
  const today = new Date(); // Dzisiejsza data

  return (
    <div className="flex justify-center py-8">
      <ul className="py-8">
        {contractors.length > 0 ? (
          contractors.map((contractor) => {
            const contactDate = new Date(contractor.contactDate); // Konwersja daty kontrahenta
            const timeDifference = contactDate.getTime() - today.getTime(); // Różnica w milisekundach
            const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Różnica w dniach

            // Ustawiamy kolor tła na czerwony, jeśli dni do kontaktu jest mniej niż 4
            const backgroundColor = daysLeft <= 4 ? "bg-red-400" : "bg-white";

            return (
              <li className={`${backgroundColor} p-4`} key={contractor._id}>
                <strong>{contractor.name}</strong> - {contractor.nip} -{" "}
                {contractor.phone} | {contractor.address} | {contractor.notes} |{" "}
                <strong>
                  {contactDate.toLocaleDateString("pl-PL", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}{" "}
                </strong>
                |
                <button
                  className="px-5 py-3 mx-8 text-white bg-red-600"
                  onClick={() => onDeleteContractor(contractor._id)}
                >
                  Delete
                </button>
              </li>
            );
          })
        ) : (
          <p className="text-red-600">No contractors found</p>
        )}
      </ul>
    </div>
  );
};

export default ContractorsList;
