import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
      const navigate = useNavigate();

      const handleGoHome = () => {
            navigate("/"); // Przekierowanie na stronę główną
      };

      return (
          <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
                <h1 className="text-9xl font-bold text-red-600">404</h1>
                <h2 className="text-4xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
                <p className="text-gray-600 mt-2 text-center max-w-md">
                      Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                </p>
                <button
                    onClick={handleGoHome}
                    className="mt-8 px-6 py-3 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition-all"
                >
                      Go Home
                </button>
          </div>
      );
};

export default ErrorPage;