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
import { toast } from "react-toastify";

interface Contractor {
  _id: string;
  name: string;
  nip: string;
  phone: string;
  address: string;
  contactDate: string;
  priceColorless?: number;
  priceColor?: number;
  priceUnknown?: number;
  typeUnknown?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

const ContractorsPage: React.FC = () => {
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [filteredContractors, setFilteredContractors] = useState<Contractor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingContractor, setEditingContractor] = useState<Contractor | null>(null);
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

  const handleAddContractor = async (newContractor: Contractor) => {
    try {
      const addedContractor = await addContractor(newContractor);
      const updatedContractors = [...contractors, addedContractor];
      setContractors(updatedContractors);
      setFilteredContractors(updatedContractors);
      toast.success("Contractor added successfully!");
    } catch (error) {
      console.error("Failed to add contractor:", error);
      toast.error("Failed to add contractor");
    }
  };

  const handleUpdateContractor = async (updatedContractor: Contractor) => {
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
      toast.success("Contractor updated successfully!");
    } catch (error) {
      console.error("Failed to update contractor:", error);
      toast.error("Failed to update contractor");
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
      toast.info("Contractor deleted");
    } catch (error) {
      console.error("Failed to delete contractor:", error);
      toast.error("Failed to delete contractor");
    }
  };

  const handleEditContractor = (contractor: Contractor) => {
    setEditingContractor(contractor);
  };

  return (
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-lg shadow-lg mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-wide">Contractors Management</h1>
            <LogoutButton/>
          </div>
        </div>

        {/* Search Field */}
        <div className="my-6 flex items-center">
          <input
              type="text"
              placeholder="Search by company name"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>

        {/* Form and List of Contractors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ContractorForm
                contractor={editingContractor}
                onAddContractor={handleAddContractor}
                onUpdateContractor={handleUpdateContractor}
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <ContractorsList
                contractors={filteredContractors}
                onDeleteContractor={handleDeleteContractor}
                onEditContractor={handleEditContractor}
            />
          </div>
        </div>
      </div>
  );
};

export default ContractorsPage;