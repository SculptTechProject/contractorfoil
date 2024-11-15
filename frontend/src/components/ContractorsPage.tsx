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
  const [filteredContractors, setFilteredContractors] = useState<Contractor[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [editingContractor, setEditingContractor] = useState<Contractor | null>(
    null
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <div className="container px-4 py-8 lg:mx-auto">
      {/* Header */}
      <div className="p-6 mb-6 text-white rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-wide">
            Contractors Management
          </h1>
          <LogoutButton />
        </div>
      </div>

      {/* Search Field */}
      <div className="sticky top-0 z-10 mb-6 bg-white">
        <input
          type="text"
          placeholder="Search by company name"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-3 transition duration-300 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Add Contractor Button for Mobile */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed z-10 p-4 text-white bg-blue-600 rounded-full bottom-8 right-8 lg:hidden hover:bg-blue-400"
      >
        + Add Contractor
      </button>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 right-0 z-20 w-3/4 h-full bg-white shadow-lg transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <div className="px-5 py-8">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="px-8 py-2 mt-16 mb-10 text-lg font-bold bg-red-500 rounded-lg mt-26 hover:bg-red-300"
          >
            Close
          </button>
          <ContractorForm
            contractor={editingContractor}
            onAddContractor={handleAddContractor}
            onUpdateContractor={handleUpdateContractor}
          />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="hidden p-8 bg-white rounded-lg shadow-lg lg:block top-16 h-fit">
          <ContractorForm
            contractor={editingContractor}
            onAddContractor={handleAddContractor}
            onUpdateContractor={handleUpdateContractor}
          />
        </div>
        <div className="bg-white rounded-lg shadow-lg sm:mb-12 lg:p-8 lg:overflow-y-auto sm:overflow-y-auto sm:p-24">
          <ContractorsList
            contractors={filteredContractors}
            onDeleteContractor={handleDeleteContractor}
            onEditContractor={handleEditContractor}
            className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          />
        </div>
      </div>
    </div>
  );
};

export default ContractorsPage;
