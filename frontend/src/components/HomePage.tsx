import React, { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen"; // Import ekranu ładowania

const HomePage: React.FC = () => {
    const [expandedFeature, setExpandedFeature] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Dodanie stanu ładowania

    // Symulacja ładowania danych
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // 2-sekundowy ekran ładowania
        return () => clearTimeout(timer);
    }, []);

    // Funkcja do rozwijania lub zwijania funkcji
    const toggleFeature = (index: number) => {
        setExpandedFeature(expandedFeature === index ? null : index);
    };

    const features = [
        {
            title: "📅 Track contractor schedules",
            description:
                "With our built-in calendar, you can easily manage and track all contractor schedules. You'll never miss an appointment.",
        },
        {
            title: "📞 Set reminders to contact contractors",
            description:
                "Automate reminders for important contractor calls and follow-ups. Keep your communication on point.",
        },
        {
            title: "📝 Store contractor details",
            description:
                "Keep all relevant contractor information in one place, including phone numbers, pricing, and notes.",
        },
        {
            title: "📍 Optimize routes with Google Maps",
            description:
                "Integrated Google Maps allows you to optimize routes when visiting multiple contractors, saving you time and fuel.",
        },
        {
            title: "🔐 Secure access and authentication",
            description:
                "All your data is safe with our robust authentication and security protocols.",
        },
    ];

    // Wyświetlenie ekranu ładowania, jeśli trwa ładowanie
    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="home-page flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            {/* Nagłówek strony */}
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    Welcome to ContractorFoil
                </h1>
                <p className="text-lg text-gray-600">
                    Manage contractors efficiently and stay organized.
                </p>
            </header>

            {/* Sekcja z funkcjami aplikacji */}
            <section className="features text-center mb-12 max-w-4xl">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                    Key Features of ContractorFoil
                </h2>
                <ul className="list-none space-y-4 text-gray-600">
                    {features.map((feature, index) => (
                        <li
                            key={index}
                            className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                            onClick={() => toggleFeature(index)}
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">{feature.title}</h3>
                                <span className="text-sm">
                  {expandedFeature === index ? "🔼" : "🔽"}
                </span>
                            </div>

                            {/* Rozwijany opis z animacją */}
                            <div
                                className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                                    expandedFeature === index ? "max-h-40" : "max-h-0"
                                }`}
                            >
                                <p className="mt-4 text-gray-500">{feature.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Call to Action */}
            <div className="cta flex flex-col items-center space-y-4">
                <p className="text-xl text-gray-700">Ready to get started?</p>
                <div className="flex space-x-4">
                    <a
                        href="/login"
                        className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105 duration-300"
                    >
                        Login
                    </a>
                    <a
                        href="/register"
                        className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105 duration-300"
                    >
                        Register
                    </a>
                </div>
            </div>

            {/* Stopka */}
            <footer className="mt-12 text-gray-500 text-center">
                <p>© 2024 ContractorFoil. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;