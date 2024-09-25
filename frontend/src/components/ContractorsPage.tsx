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
  const [filteredContractors, setFilteredContractors] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // Stan dla wyszukiwania
  const [editingContractor, setEditingContractor] = useState<any | null>(null); // Kontrahent do edycji

  useEffect(() => {
    const loadContractors = async () => {
      try {
        const data = await fetchContractors();
        setContractors(data);
        setFilteredContractors(data); // Ustawienie domyślnej listy przefiltrowanych kontrahentów
      } catch (error) {
        console.error("Failed to load contractors:", error);
      }
    };
    loadContractors();
  }, []);

  // Funkcja do obsługi zmiany wyszukiwanego tekstu
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = contractors.filter((contractor) =>
        contractor.name.toLowerCase().includes(term)
    );

    setFilteredContractors(filtered); // Ustawienie przefiltrowanych kontrahentów
  };

  // Dodawanie nowego kontrahenta
  const handleAddContractor = async (newContractor: any) => {
    try {
      const addedContractor = await addContractor(newContractor);
      const updatedContractors = [...contractors, addedContractor];
      setContractors(updatedContractors); // Aktualizacja pełnej listy
      setFilteredContractors(updatedContractors); // Aktualizacja przefiltrowanej listy
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
      );
      const updatedList = contractors.map((contractor) =>
          contractor._id === updated._id ? updated : contractor
      );
      setContractors(updatedList); // Aktualizacja pełnej listy
      setFilteredContractors(updatedList); // Aktualizacja przefiltrowanej listy
      setEditingContractor(null); // Resetowanie po aktualizacji
    } catch (error) {
      console.error("Failed to update contractor:", error);
    }
  };

  // Usuwanie kontrahenta
  const handleDeleteContractor = async (id: string) => {
    try {
      await deleteContractor(id);
      const updatedList = contractors.filter(
          (contractor) => contractor._id !== id
      );
      setContractors(updatedList); // Aktualizacja pełnej listy
      setFilteredContractors(updatedList); // Aktualizacja przefiltrowanej listy
    } catch (error) {
      console.error("Failed to delete contractor:", error);
    }
  };

  // Edytowanie kontrahenta
  const handleEditContractor = (contractor: any) => {
    setEditingContractor(contractor);
  };

  return (
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center lg:text-left lg:flex lg:justify-between lg:items-center">
          <h1 className="text-2xl font-bold mb-4 lg:mb-0 lg:text-3xl">
            Contractors Management
          </h1>
          {/* Przycisk wylogowania */}
          <LogoutButton />
        </div>

        {/* Pole wyszukiwania */}
        <input
            type="text"
            placeholder="Search by company name"
            value={searchTerm}
            onChange={handleSearch}
            className="mt-4 mb-8 p-2 border border-gray-300 rounded-lg w-full lg:w-1/2"
        />

        <div className="mt-8">
          {/* Formularz i lista kontrahentów */}
          <ContractorForm
              contractor={editingContractor}
              onAddContractor={handleAddContractor}
              onUpdateContractor={handleUpdateContractor}
          />
          <ContractorsList
              contractors={filteredContractors} // Podajemy przefiltrowaną listę
              onDeleteContractor={handleDeleteContractor}
              onEditContractor={handleEditContractor}
          />
        </div>
      </div>
  );
};

export default ContractorsPage;