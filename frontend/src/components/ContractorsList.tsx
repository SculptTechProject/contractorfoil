import React, { useEffect, useState } from "react";
import { fetchContractors, deleteContractor } from "../services/api";

const ContractorsList: React.FC = () => {
  const [contractors, setContractors] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Pobieranie kontrahentów z backendu
  useEffect(() => {
    const getContractors = async () => {
      try {
        const data = await fetchContractors();
        console.log("Fetched contractors:", data);
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

  // Funkcja usuwająca kontrahenta
  const handleDelete = async (id: string) => {
    try {
      await deleteContractor(id);

      // Aktualizacja stanu po usunięciu kontrahenta
      setContractors((prevContractors) =>
        prevContractors.filter((contractor) => contractor._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete contractor:", error);
      setError("Failed to delete contractor");
    }
  };

  return (
    <div>
      <h2>Contractors List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {contractors.length > 0 ? (
          contractors.map((contractor) => (
            <li key={contractor._id}>
              <strong>{contractor.name}</strong> - {contractor.phone},{" "}
              {contractor.address}{" "}
              {/* Dodanie przycisku usuwania */}
              <button className="bg-red-500 text-slate-50 py-2 px-3" onClick={() => handleDelete(contractor._id)}>
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
