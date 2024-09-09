import React, { useEffect, useState } from "react";
import { fetchContractors } from "../services/api";

const ContractorsList: React.FC = () => {
  const [contractors, setContractors] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getContractors = async () => {
      try {
        const data = await fetchContractors();
        console.log("Fetched contractors:", data); // Sprawdź, co zwraca API
        if (data) {
          setContractors(data);
        } else {
          setError("No data found");
        }
      } catch (error) {
        console.error("Error fetching contractors:", error);
        setError("Failed to fetch contractors");
      }
    };
    getContractors();
  }, []);

  return (
    <div>
      <h2>Contractors List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {contractors.length > 0 ? (
          contractors.map((contractor) => (
            <li key={contractor._id}>
              <strong>{contractor.name}</strong> - {contractor.phone},{" "}
              {contractor.address}
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
