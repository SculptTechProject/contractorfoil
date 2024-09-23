import React from "react";

const LoadingScreen: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Tekst ładujący */}
            <p className="text-xl text-gray-600 mb-6">Loading ContractorFoil...</p>

            {/* Animacja kropek */}
            <div className="flex space-x-2">
                <div className="dot bg-blue-500 h-4 w-4 rounded-full animate-bounce"></div>
                <div className="dot bg-green-500 h-4 w-4 rounded-full animate-bounce200"></div>
                <div className="dot bg-red-500 h-4 w-4 rounded-full animate-bounce400"></div>
            </div>
        </div>
    );
};

export default LoadingScreen;