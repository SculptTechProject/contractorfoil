import React, { useState, useEffect } from "react";
import ContractorForm from "./ContractorForm";
import ContractorsList from "./ContractorsList";
import {
  fetchContractors,
  addContractor,
  deleteContractor,
} from "../services/api";

const ContractorsPage: React.FC = () => {
  const [contractors, setContractors] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Pobieranie kontrahentów z backendu
  useEffect(() => {
    const getContractors = async () => {
      try {
        const data = await fetchContractors();
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

  // Funkcja dodająca nowego kontrahenta
  const handleAddContractor = async (newContractor: any) => {
    try {
      const response = await addContractor(newContractor);
      setContractors((prevContractors) => [...prevContractors, response]);
    } catch (error) {
      console.error("Failed to add contractor:", error);
    }
  };

  // Funkcja usuwająca kontrahenta
  const handleDeleteContractor = async (id: string) => {
    try {
      await deleteContractor(id);
      setContractors((prevContractors) =>
        prevContractors.filter((contractor) => contractor._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete contractor:", error);
    }
  };

  return (
    <div>
      <h1>Contractor Management</h1>
      <ContractorForm onAddContractor={handleAddContractor} />
      <ContractorsList
        contractors={contractors}
        onDeleteContractor={handleDeleteContractor}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ContractorsPage;
