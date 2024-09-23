import React, { useState, useEffect } from "react";
import {
  fetchContractors,
  addContractor,
  deleteContractor,
  updateContractor,
} from "../services/api";
import ContractorForm from "./ContractorForm";
import ContractorsList from "./ContractorsList";
import LogoutButton from "./LogoutButton"; // Import przycisku wylogowania

const ContractorsPage: React.FC = () => {
  const [contractors, setContractors] = useState<any[]>([]);
  const [editingContractor, setEditingContractor] = useState<any | null>(null);

  useEffect(() => {
    const loadContractors = async () => {
      try {
        const data = await fetchContractors();

        // Sortowanie kontrahentów na podstawie daty kontaktu, im bliżej, tym wyżej na liście
        const sortedContractors = data.sort((a: any, b: any) => {
          const dateA = new Date(a.contactDate);
          const dateB = new Date(b.contactDate);
          return dateA.getTime() - dateB.getTime(); // Sortujemy według daty
        });

        setContractors(sortedContractors);
      } catch (error) {
        console.error("Failed to load contractors:", error);
      }
    };
    loadContractors();
  }, []);

  const handleAddContractor = async (newContractor: any) => {
    try {
      const addedContractor = await addContractor(newContractor);
      setContractors([...contractors, addedContractor]);
    } catch (error) {
      console.error("Failed to add contractor:", error);
    }
  };

  const handleUpdateContractor = async (updatedContractor: any) => {
    try {
      const updated = await updateContractor(
          updatedContractor._id,
          updatedContractor
      );
      setContractors(
          contractors.map((contractor) =>
              contractor._id === updated._id ? updated : contractor
          )
      );
      setEditingContractor(null);
    } catch (error) {
      console.error("Failed to update contractor:", error);
    }
  };

  const handleDeleteContractor = async (id: string) => {
    console.log("Contractor ID to delete:", id); // Dodaj logowanie ID
    try {
      await deleteContractor(id);
      setContractors(contractors.filter((contractor) => contractor._id !== id));
    } catch (error) {
      console.error("Failed to delete contractor:", error);
    }
  };

  const handleEditContractor = (contractor: any) => {
    setEditingContractor(contractor);
  };

  return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto">
          <div className="relative flex flex-col sm:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-center text-gray-700">
              Contractors Management
            </h1>
            <div className="mt-4 sm:mt-0 sm:absolute sm:right-0 sm:top-0">
              <LogoutButton />
            </div>
          </div>
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