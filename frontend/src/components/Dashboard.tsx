import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDate from "../hooks/useDate";
import LogoutButton from "./LogoutButton";
import { FaCalendarAlt, FaChalkboardTeacher } from "react-icons/fa";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { date, wish } = useDate();
  const [userName, setUserName] = useState<string | null>(null);

  const goToContractorsPage = () => {
    navigate("/contractors");
  };

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      {/* Header */}
      <div className="flex items-center justify-between p-6 text-white">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <LogoutButton />
      </div>

      {/* Welcome Message */}
      <div className="flex flex-col items-center justify-center flex-grow text-white">
        {userName && (
          <div data-aos="fade-down" className="text-center">
            <p className="mb-4 text-4xl font-semibold">
              {wish}, {userName}!
            </p>
            <p className="mb-8 text-2xl">
              <FaCalendarAlt className="inline-block mr-2" />
              Today is {date}
            </p>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={goToContractorsPage}
          className="flex items-center px-6 py-4 font-semibold text-blue-500 transition-all bg-white rounded-full shadow-lg hover:bg-sky-50"
          data-aos="zoom-in"
        >
          <FaChalkboardTeacher className="mr-3 text-2xl" />
          Go to Contractors Management
        </button>
      </div>

      {/* Footer */}
      <footer className="p-4 text-center text-white">
        &copy; {new Date().getFullYear()} ContractorFoil
      </footer>
    </div>
  );
};

export default Dashboard;
