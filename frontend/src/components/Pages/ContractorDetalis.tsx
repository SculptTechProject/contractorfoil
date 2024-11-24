import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchContractorById, updateContractor } from "../../services/api";
import { toast } from "react-toastify";
import { FaMapMarkerAlt, FaEdit, FaSave, FaArrowLeft } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const ContractorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // id z URL
  const [contractor, setContractor] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({
    name: "",
    nip: "",
    phone: "",
    address: "",
    contactDate: "",
    priceColorless: "",
    priceColor: "",
    priceUnknown: "",
    typeUnknown: "",
    notes: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const loadContractorDetails = async () => {
      if (!id) {
        setError("No contractor ID found in the URL");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchContractorById(id);
        setContractor(data);
        setFormData({
          name: data.name,
          nip: data.nip,
          phone: data.phone,
          address: data.address,
          contactDate: data.contactDate,
          priceColorless: data.priceColorless,
          priceColor: data.priceColor,
          priceUnknown: data.priceUnknown,
          typeUnknown: data.typeUnknown,
          notes: data.notes,
        });
      } catch (error) {
        setError("Failed to fetch contractor details");
      } finally {
        setLoading(false);
      }
    };

    loadContractorDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-blue-500">Loading contractor details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => navigate("/contractors")}
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Go Back to Contractors
        </button>
      </div>
    );
  }

  if (!contractor) {
    return <p className="text-center text-gray-500">Contractor not found.</p>;
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    if (contractor && contractor._id) {
      try {
        const updatedContractor = await updateContractor(
          contractor._id,
          formData
        );
        setIsEditing(false);
        toast.success("Contractor updated successfully");
        setContractor(updatedContractor);
      } catch (error) {
        console.error("Failed to update contractor:", error);
        toast.error("Failed to update contractor");
      }
    }
  };

  const contactDate = new Date(contractor.contactDate).toLocaleDateString(
    "pl-PL"
  );

  const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    contractor.address
  )}`;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      {/* Nagłówek */}
      <div className="flex items-center justify-between p-6 text-white">
        <button
          onClick={() => navigate("/contractors")}
          className="flex items-center px-3 py-2 transition duration-300 bg-white rounded-full bg-opacity-20 hover:bg-opacity-40"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
        <h1 className="text-3xl font-bold ">Contractor Details</h1>
      </div>

      <div className="flex items-center justify-center flex-grow">
        <div
          className="w-full max-w-4xl p-8 mx-4 bg-white rounded-lg shadow-lg"
          data-aos="fade-up"
        >
          <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
            {contractor.name}
          </h2>

          {isEditing ? (
            // Formularz edycji
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    NIP
                  </label>
                  <input
                    type="text"
                    name="nip"
                    value={formData.nip}
                    onChange={handleFormChange}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price FOD Colorless
                  </label>
                  <input
                    type="number"
                    name="priceColorless"
                    value={formData.priceColorless}
                    onChange={handleFormChange}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="zł/kg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price FOD Color
                  </label>
                  <input
                    type="number"
                    name="priceColor"
                    value={formData.priceColor}
                    onChange={handleFormChange}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="zł/kg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Type Unknown
                  </label>
                  <input
                    type="text"
                    name="typeUnknown"
                    value={formData.typeUnknown}
                    onChange={handleFormChange}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price Unknown
                  </label>
                  <input
                    type="number"
                    name="priceUnknown"
                    value={formData.priceUnknown}
                    onChange={handleFormChange}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="zł/kg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Contact Date
                  </label>
                  <input
                    type="date"
                    name="contactDate"
                    value={formData.contactDate.split("T")[0]}
                    onChange={handleFormChange}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleFormChange}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    rows={4}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleSave}
                  className="flex items-center px-6 py-2 text-white transition duration-300 bg-green-500 rounded-lg hover:bg-green-600"
                >
                  <FaSave className="mr-2" />
                  Save Changes
                </button>
                <button
                  className="flex items-center px-6 py-2 text-white transition duration-300 bg-gray-500 rounded-lg hover:bg-gray-600"
                  onClick={handleEditToggle}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // Wyświetlanie szczegółów kontrahenta
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="p-6 bg-gray-100 rounded-lg shadow">
                  <h3 className="mb-4 text-xl font-semibold text-gray-700">
                    Company Information
                  </h3>
                  <p className="text-gray-800">
                    <strong>NIP:</strong> {contractor.nip}
                  </p>
                  <p className="text-gray-800">
                    <strong>Phone:</strong> {contractor.phone}
                  </p>
                  <p className="text-gray-800">
                    <strong>Address:</strong> {contractor.address}
                  </p>
                  <p className="text-gray-800">
                    <strong>Contact Date:</strong> {contactDate}
                  </p>
                  <p className="text-gray-800">
                    <strong>Notes:</strong> {contractor.notes || "None"}
                  </p>
                </div>
                <div className="p-6 bg-gray-100 rounded-lg shadow">
                  <h3 className="mb-4 text-xl font-semibold text-gray-700">
                    Pricing Information
                  </h3>
                  <p className="text-gray-800">
                    <strong>Price FOD Colorless:</strong>{" "}
                    {contractor.priceColorless
                      ? `${contractor.priceColorless.toFixed(2)} zł/kg`
                      : "No price"}
                  </p>
                  <p className="text-gray-800">
                    <strong>Price FOD Color:</strong>{" "}
                    {contractor.priceColor
                      ? `${contractor.priceColor.toFixed(2)} zł/kg`
                      : "No price"}
                  </p>
                  {contractor.typeUnknown && (
                    <p className="text-gray-800">
                      <strong>{contractor.typeUnknown}:</strong>{" "}
                      {contractor.priceUnknown
                        ? `${contractor.priceUnknown.toFixed(2)} zł/kg`
                        : "No price"}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-6 py-3 text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  <FaMapMarkerAlt className="mr-2" />
                  View on Google Maps
                </a>
                <div className="text-gray-600">
                  <p>
                    <strong>Last Updated:</strong>{" "}
                    {new Date(contractor.updatedAt).toLocaleDateString("pl-PL")}
                  </p>
                  <p>
                    <strong>Created At:</strong>{" "}
                    {new Date(contractor.createdAt).toLocaleDateString("pl-PL")}
                  </p>
                </div>
              </div>
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  className="flex items-center px-6 py-2 text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
                  onClick={handleEditToggle}
                >
                  <FaEdit className="mr-2" />
                  Edit Contractor
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractorDetails;
