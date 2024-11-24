import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
      const navigate = useNavigate();

      const handleGoHome = () => {
            navigate("/"); // Przekierowanie na stronę główną
      };

      return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="font-bold text-red-600 text-9xl">404</h1>
                <h2 className="mt-4 text-4xl font-semibold text-gray-800">Page Not Found</h2>
                <p className="max-w-md mt-2 text-center text-gray-600">
                      Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                </p>
                <button
                    onClick={handleGoHome}
                    className="px-6 py-3 mt-8 text-lg text-white transition-all bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                      Go Home
                </button>
          </div>
      );
};

export default ErrorPage;