import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/api"; // Import funkcji logout

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser(); // Wywołanie funkcji logoutUser (usuwa token)
        navigate("/login"); // Przekierowanie do strony logowania
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
        >
            Logout
        </button>
    );
};

export default LogoutButton;