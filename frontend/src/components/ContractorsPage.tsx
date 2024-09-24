import React, { useState, useEffect } from "react";
import {
  fetchContractors,
  addContractor,
  deleteContractor,
  updateContractor,
} from "../services/api";
import ContractorForm from "./ContractorForm";
import ContractorsList from "./ContractorsList";
import LogoutButton from "./LogoutButton";

const ContractorsPage: React.FC = () => {
  const [contractors, setContractors] = useState<any[]>([]);
  const [editingContractor, setEditingContractor] = useState<any | null>(null); // Kontrahent do edycji

  useEffect(() => {
    const loadContractors = async () => {
      try {
        const data = await fetchContractors();
        setContractors(data);
      } catch (error) {
        console.error("Failed to load contractors:", error);
      }
    };
    loadContractors();
  }, []);

  // Dodawanie nowego kontrahenta
  const handleAddContractor = async (newContractor: any) => {
    try {
      const addedContractor = await addContractor(newContractor);
      setContractors([...contractors, addedContractor]); // Dodanie kontrahenta do listy
    } catch (error) {
      console.error("Failed to add contractor:", error);
    }
  };

  // Aktualizacja istniejącego kontrahenta
  const handleUpdateContractor = async (updatedContractor: any) => {
    try {
      const updated = await updateContractor(
          updatedContractor._id,
          updatedContractor
      ); // Wywołanie update
      setContractors(
          contractors.map((contractor) =>
              contractor._id === updated._id ? updated : contractor
          )
      );
      setEditingContractor(null); // Resetowanie po aktualizacji
    } catch (error) {
      console.error("Failed to update contractor:", error);
    }
  };

  // Usuwanie kontrahenta
  const handleDeleteContractor = async (id: string) => {
    console.log("Contractor ID to delete: ", id);  // Logowanie ID kontrahenta
    try {
      await deleteContractor(id);
      setContractors(contractors.filter((contractor) => contractor._id !== id));
    } catch (error) {
      console.error("Failed to delete contractor:", error);
    }
  };

  // Edytowanie kontrahenta
  const handleEditContractor = (contractor: any) => {
    setEditingContractor(contractor); // Przekazanie kontrahenta do edycji
  };

  return (
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        {/* Wyśrodkowanie dla komputerów, zachowanie normalne dla telefonów */}
        <div className="text-center lg:text-left lg:flex lg:justify-between lg:items-center">
          <h1 className="text-2xl font-bold mb-4 lg:mb-0 lg:text-3xl">
            Contractors Management
          </h1>
          {/* Przycisk wylogowania */}
          <LogoutButton/>
        </div>
        <div className="mt-8">
          {/* Formularz i lista kontrahentów */}
          <ContractorForm
              contractor={editingContractor}
              onAddContractor={handleAddContractor}
              onUpdateContractor={handleUpdateContractor}
          />
          <ContractorsList
              contractors={contractors}
              onDeleteContractor={handleDeleteContractor}
              onEditContractor={handleEditContractor}
          />
        </div>
      </div>
  );
};

export default ContractorsPage;