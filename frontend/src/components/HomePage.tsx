import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../index.css";
import {useNavigate} from "react-router-dom";

const LandingPage = () => {
    useEffect(() => {
        AOS.init({
            duration: 1200,
            easing: "ease-in-out-back",
        });
    }, []);

    const navigate = useNavigate();
    const targetSectionRef = useRef<HTMLDivElement | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [cursorVariant, setCursorVariant] = useState<'default' | 'hover'>('default');

    const handleSignUpBtn = () => {
        navigate("/register");  // Tutaj używasz navigate do przekierowania
    };

    const handleGetStartedClick = () => {
        if (targetSectionRef.current) {
            targetSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const handleMouseEnter = () => setCursorVariant("hover");
    const handleMouseLeave = () => setCursorVariant("default");

    const variants: Record<'default' | 'hover', { x: number; y: number; scale: number; background: string }> = {
        default: {
            x: mousePos.x - 20,
            y: mousePos.y - 20,
            scale: 1,
            background: "rgba(123, 239, 178, 0.8)",
        },
        hover: {
            x: mousePos.x - 40,
            y: mousePos.y - 40,
            scale: 1.5,
            background: "rgba(255, 215, 0, 0.9)",
        },
    };

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-green-200 via-teal-300 to-blue-400 min-h-screen">
            <div
                className={`absolute pointer-events-none w-10 h-10 rounded-full blur-2xl transition-transform duration-300 ease-in-out`}
                style={{
                    left: `${variants[cursorVariant].x}px`,
                    top: `${variants[cursorVariant].y}px`,
                    transform: `scale(${variants[cursorVariant].scale})`,
                    backgroundColor: variants[cursorVariant].background,
                    zIndex: 50,
                }}
            ></div>

            <section
                className="relative text-gray-900 min-h-screen flex flex-col justify-center items-center text-center px-4"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-wider text-teal-900" data-aos="fade-down">
                    Welcome to ContractorFoil
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-lg text-gray-800" data-aos="fade-up">
                    Manage contractors with efficiency and modern tools.
                </p>
                <button
                    className="bg-yellow-300 text-teal-900 font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition-transform transform hover:scale-110 z-50"
                    data-aos="zoom-in"
                    onClick={handleGetStartedClick}
                >
                    Get Started
                </button>

                {/* Paralaksa - Tło */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
                    style={{
                        transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px)`,
                    }}
                ></div>
            </section>

            {/* About Section */}
            <section className="py-32 text-center bg-teal-50" ref={targetSectionRef}>
                <h2 className="text-5xl font-bold mb-8 text-gray-900" data-aos="fade-up">
                    Why ContractorFoil?
                </h2>
                <p className="max-w-4xl mx-auto text-gray-700 text-lg" data-aos="fade-up">
                    ContractorFoil simplifies contractor management by giving you the tools to track, optimize, and collaborate effortlessly with real-time updates.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 px-4">
                    <div className="p-8 bg-white rounded-lg shadow-lg transform hover:scale-110 transition-transform relative" data-aos="fade-right">
                        <h3 className="font-semibold text-2xl mb-6 text-gray-800">Track Contractors</h3>
                        <p className="text-gray-600 text-lg">
                            Stay on top of every contractor, schedule, and task with precision and flexibility.
                        </p>
                    </div>
                    <div className="p-8 bg-white rounded-lg shadow-lg transform hover:scale-110 transition-transform relative" data-aos="fade-up">
                        <h3 className="font-semibold text-2xl mb-6 text-gray-800">Optimize Routes</h3>
                        <p className="text-gray-600 text-lg">
                            Our route optimization tools ensure efficiency when handling multiple contractors.
                        </p>
                    </div>
                    <div className="p-8 bg-white rounded-lg shadow-lg transform hover:scale-110 transition-transform relative" data-aos="fade-left">
                        <h3 className="font-semibold text-2xl mb-6 text-gray-800">Collaborate Seamlessly</h3>
                        <p className="text-gray-600 text-lg">
                            Real-time collaboration tools keep your team connected and working efficiently.
                        </p>
                    </div>
                </div>
            </section>

            {/* Expanded Features Section */}
            <section className="py-32 bg-gradient-to-br from-blue-600 to-purple-600 text-white text-center">
                <h2 className="text-5xl font-bold mb-8" data-aos="fade-up">More Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-4">
                    <div className="p-8 bg-indigo-500 rounded-lg shadow-lg transform hover:scale-110 transition-transform relative" data-aos="fade-right">
                        <h3 className="text-2xl font-semibold mb-4">Automation</h3>
                        <p className="text-lg">Automated reminders ensure you never miss a deadline with your contractors.</p>
                    </div>
                    <div className="p-8 bg-purple-500 rounded-lg shadow-lg transform hover:scale-110 transition-transform relative" data-aos="fade-up">
                        <h3 className="text-2xl font-semibold mb-4">Advanced Analytics</h3>
                        <p className="text-lg">Gain insights to make smarter business decisions and optimize your workflow.</p>
                    </div>
                    <div className="p-8 bg-pink-500 rounded-lg shadow-lg transform hover:scale-110 transition-transform relative" data-aos="fade-up">
                        <h3 className="text-2xl font-semibold mb-4">Seamless Integration</h3>
                        <p className="text-lg">Integrate ContractorFoil with your existing tools and platforms with ease.</p>
                    </div>
                    <div className="p-8 bg-green-500 rounded-lg shadow-lg transform hover:scale-110 transition-transform relative" data-aos="fade-left">
                        <h3 className="text-2xl font-semibold mb-4">Security</h3>
                        <p className="text-lg">Your data is protected with enterprise-grade encryption and security protocols.</p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-indigo-600 text-white py-20 text-center relative" data-aos="zoom-in-up">
                <h2 className="text-4xl font-bold mb-6">Take Control of Contractor Management</h2>
                <p className="mb-8 text-lg">Join hundreds of users revolutionizing their workflow with ContractorFoil.</p>
                <button
                    onClick={handleSignUpBtn}
                    className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-full hover:bg-indigo-100 transition-transform transform hover:scale-110"
                >
                    Sign Up Now
                </button>
            </section>

            {/* Footer */}
            <footer className="bg-white text-gray-800 py-1 text-center relative">
                <p>&copy; 2024 ContractorFoil. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;