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
  const [searchTerm, setSearchTerm] = useState("");
  const [editingContractor, setEditingContractor] = useState<any | null>(null);

  useEffect(() => {
    const loadContractors = async () => {
      try {
        const data = await fetchContractors();
        setContractors(data);
        setFilteredContractors(data);
      } catch (error) {
        console.error("Failed to load contractors:", error);
      }
    };
    loadContractors();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = contractors.filter((contractor) =>
        contractor.name.toLowerCase().includes(term)
    );

    setFilteredContractors(filtered);
  };

  const handleAddContractor = async (newContractor: any) => {
    try {
      const addedContractor = await addContractor(newContractor);
      const updatedContractors = [...contractors, addedContractor];
      setContractors(updatedContractors);
      setFilteredContractors(updatedContractors);
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
      const updatedList = contractors.map((contractor) =>
          contractor._id === updated._id ? updated : contractor
      );
      setContractors(updatedList);
      setFilteredContractors(updatedList);
      setEditingContractor(null);
    } catch (error) {
      console.error("Failed to update contractor:", error);
    }
  };

  const handleDeleteContractor = async (id: string) => {
    try {
      await deleteContractor(id);
      const updatedList = contractors.filter(
          (contractor) => contractor._id !== id
      );
      setContractors(updatedList);
      setFilteredContractors(updatedList);
    } catch (error) {
      console.error("Failed to delete contractor:", error);
    }
  };

  const handleEditContractor = (contractor: any) => {
    setEditingContractor(contractor);
  };

  return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Contractors Management</h1>
            <LogoutButton />
          </div>
        </div>

        {/* Pole wyszukiwania */}
        <div className="my-6">
          <input
              type="text"
              placeholder="Search by company name"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>

        {/* Formularz i lista kontrahentów */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ContractorForm
              contractor={editingContractor}
              onAddContractor={handleAddContractor}
              onUpdateContractor={handleUpdateContractor}
          />
          <ContractorsList
              contractors={filteredContractors}
              onDeleteContractor={handleDeleteContractor}
              onEditContractor={handleEditContractor}
          />
        </div>
      </div>
  );
};

export default ContractorsPage;