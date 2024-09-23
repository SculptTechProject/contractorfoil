import React from "react";

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

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <ul className="space-y-4">
                {contractors.length > 0 ? (
                    contractors.map((contractor) => {
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
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-semibold">{contractor.name}</h3>
                                        <p className="text-sm text-gray-500">
                                            {contractor.nip} | {contractor.phone} | {contractor.address} <br />
                                            <strong>Date:</strong> {contactDate.toLocaleDateString("pl-PL")}<br />
                                            <strong>Notes:</strong> {contractor.notes}
                                        </p>
                                    </div>
                                    <div className="space-x-4">
                                        <button
                                            onClick={() => onEditContractor(contractor)}
                                            className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => onDeleteContractor(contractor._id)}
                                            className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
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