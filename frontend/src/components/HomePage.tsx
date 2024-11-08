import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../index.css";
import {useNavigate} from "react-router-dom";
import Footer from "./Footer";
import {FaDollarSign} from "react-icons/fa";
import Bubble from "./Bubble";
import {BiCar} from "react-icons/bi";
import {FiPhoneCall, FiShield, FiTrendingUp, FiUserCheck, FiUsers} from "react-icons/fi";

interface BubbleType {
    x: string;
    y: string;
    color: string;
    size: string;
    id: string;
}

const LandingPage = () => {
    useEffect(() => {
        AOS.init({
            duration: 1200,
            easing: "ease-in-out-back",
        });
    }, []);

    const navigate = useNavigate();
    const [bubbles, setBubbles] = useState<BubbleType[]>([]);
    const targetSectionRef = useRef<HTMLDivElement | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [cursorVariant, setCursorVariant] = useState<'default' | 'hover'>('default');

    const handleSignUpBtn = () => {
        navigate("/register");  // Tutaj używasz navigate do przekierowania
    };

    const handleLoginClick = () => {
        navigate("/login");
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



    // Funkcja tworząca nowy bąbelek
    const createBubble = (): BubbleType => {
        return {
            x: `${Math.random() * 90}vw`,
            y: `${Math.random() * 90}vh`,
            color: `hsl(${Math.random() * 360}, 80%, 70%)`,
            size: `${Math.random() * 40 + 20}px`,
            id: Math.random().toString(36).substring(7),
        };
    };

    useEffect(() => {
        // Dodaj początkowe bąbelki
        const initialBubbles = Array.from({ length: 30 }, createBubble);
        setBubbles(initialBubbles);
    }, []);

    const handlePop = (id: string) => {
        // Usuń bąbelek i dodaj nowy
        setBubbles((prevBubbles) => [
            ...prevBubbles.filter((bubble) => bubble.id !== id),
            createBubble(), // Dodaj nowy bąbelek
        ]);
    };


    return (
        <div
            className="relative overflow-hidden bg-gradient-to-br from-green-200 via-teal-300 to-blue-400 min-h-screen">
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

            <header className="absolute top-4 right-4 z-50">
                <button
                    onClick={handleLoginClick}
                    className="bg-yellow-300 text-teal-900 font-bold py-2 px-4 rounded-full hover:bg-yellow-400 transition-transform transform hover:scale-110"
                >
                    Log In
                </button>
            </header>

            <section
                className="px-4 py-20 bg-gradient-to-br from-green-200 via-teal-300 to-blue-400 min-h-screen flex flex-col justify-center items-center text-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-wider text-teal-900"
                    data-aos="fade-down">
                    Welcome to ContractorFoil
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-lg text-gray-800" data-aos="fade-up">
                    Manage contractors with efficiency and modern tools.
                </p>
                <button
                    className="bg-yellow-300 text-teal-900 font-bold py-3 px-8 rounded-full mb-6 md:mb-10 hover:bg-yellow-400 transition-transform transform hover:scale-110 z-50"
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

            {/* Call to Action */}
            <section
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 text-center relative overflow-hidden min-h-screen flex flex-col justify-center items-center"
                ref={targetSectionRef}>
                {/* Tytuł i opis */}
                <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10" data-aos="fade-up">
                    Take Control of Contractor Management
                </h2>
                <p className="mb-8 text-lg max-w-2xl mx-auto relative z-10" data-aos="fade-up" data-aos-delay="100">
                    Join hundreds of users revolutionizing their workflow with ContractorFoil.
                </p>

                {/* Ikony z korzyściami */}
                <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-12 mb-12 relative z-10"
                     data-aos="fade-up" data-aos-delay="200">
                    <div className="flex flex-col items-center">
                        <div
                            className="bg-white text-indigo-600 p-4 rounded-full mb-4 shadow-lg transform transition-transform hover:scale-110">
                            {/* Ikona */}
                            <svg className="h-10 w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                 fill="currentColor">
                                <path
                                    d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2a8 8 0 11-8 8 8 8 0 018-8zm1 8V7h-2v6h4v-2h-2z"/>
                            </svg>
                        </div>
                        <p className="text-white text-lg font-semibold">Save Time</p>
                        <p className="text-gray-300 text-sm max-w-xs">Automate your contractor management tasks with
                            ease.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div
                            className="bg-white text-indigo-600 p-4 rounded-full mb-4 shadow-lg transform transition-transform hover:scale-110"
                        >
                            {/* Ikona dolara */}
                            <FaDollarSign className="h-10 w-10"/>
                        </div>
                        <p className="text-white text-lg font-semibold">Optimize Costs</p>
                        <p className="text-gray-300 text-sm max-w-xs">Reduce expenses with optimized contractor routes
                            and schedules.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div
                            className="bg-white text-indigo-600 p-4 rounded-full mb-4 shadow-lg transform transition-transform hover:scale-110">
                            <svg className="h-10 w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                 fill="currentColor">
                                <path
                                    d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2a8 8 0 11-8 8 8 8 8 0 018-8zm1 8V7h-2v6h4v-2h-2z"/>
                            </svg>
                        </div>
                        <p className="text-white text-lg font-semibold">Boost Productivity</p>
                        <p className="text-gray-300 text-sm max-w-xs">Keep your contractors on track with smart
                            scheduling.</p>
                    </div>
                </div>

                {/* Przyciski akcji */}
                <div className="flex justify-center space-x-4 relative z-10">
                    <button
                        onClick={handleSignUpBtn}
                        className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-full hover:bg-indigo-100 transition-transform transform hover:scale-110 shadow-lg"
                    >
                        Sign Up Now
                    </button>
                    <button
                        onClick={() => navigate('/learn-more')}
                        className="bg-indigo-600 border border-white text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition-transform transform hover:scale-110 shadow-lg"
                    >
                        Learn More
                    </button>
                </div>

                {/* Dekoracyjne Bąbelki w tle */}
                {bubbles.map((bubble) => (
                    <Bubble
                        key={bubble.id}
                        x={bubble.x}
                        y={bubble.y}
                        color={bubble.color}
                        size={bubble.size}
                        onPop={() => handlePop(bubble.id)}
                    />
                ))}
            </section>

            {/* Interaktywna Oś Czasu */}
            <section className="py-20 bg-gray-100">
                <h2 className="text-4xl font-bold text-center mb-12" data-aos="fade-up">
                    Evolution of ContractorFoil
                </h2>
                <div className="max-w-5xl mx-auto px-6">
                    <div className="relative">
                        <div
                            className="border-l-4 border-teal-500 absolute h-full top-0 left-1/2 transform -translate-x-1/2"></div>
                        <div className="space-y-8">
                            {/* Idea */}
                            <div className="flex items-center space-x-6">
                                <div data-aos="fade-right"
                                     className="bg-teal-500 text-white font-bold rounded-full h-12 w-24 flex items-center justify-center">10.06.2023
                                </div>
                                <div className="bg-white p-6 shadow-lg rounded-lg max-w-md" data-aos="fade-right">
                                    <h3 data-aos="fade-right" className="font-semibold text-xl">The Idea</h3>
                                    <p>ContractorFoil started as an idea to solve the challenges in contractor
                                        management faced by small businesses.</p>
                                </div>
                            </div>
                            {/* Prototype */}
                            <div className="flex items-center space-x-6 justify-end">
                                <div className="bg-white p-6 shadow-lg rounded-lg max-w-md" data-aos="fade-left">
                                    <h3 data-aos="fade-left" className="font-semibold text-xl">Prototype</h3>
                                    <p>Our initial prototype was built and tested by a small group of users. We received
                                        valuable feedback that shaped the future of the product.</p>
                                </div>
                                <div data-aos="fade-left"
                                     className="bg-teal-500 text-white font-bold rounded-full h-12 w-24 flex items-center justify-center">21.11.2023
                                </div>
                            </div>
                            {/* Launch*/}
                            <div className="flex items-center space-x-6">
                                <div data-aos="fade-right"
                                     className="bg-teal-500 text-white font-bold rounded-full h-12 w-24 flex items-center justify-center">14.04.2024
                                </div>
                                <div className="bg-white p-6 shadow-lg rounded-lg max-w-md" data-aos="fade-right">
                                    <h3 data-aos="fade-right" className="font-semibold text-xl">Launch</h3>
                                    <p>ContractorFoil officially launched with essential features to help businesses
                                        manage their contractors effectively.</p>
                                </div>
                            </div>
                            {/* Advanced */}
                            <div className="flex items-center space-x-6 justify-end">
                                <div className="bg-white p-6 shadow-lg rounded-lg max-w-md" data-aos="fade-left">
                                    <h3 data-aos="fade-left" className="font-semibold text-xl">Advanced Features</h3>
                                    <p>New features like route optimization and real-time collaboration were added,
                                        setting us apart from competitors.</p>
                                </div>
                                <div data-aos="fade-left"
                                     className="bg-teal-500 text-white font-bold rounded-full h-12 w-24 flex items-center justify-center">28.07.2024
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sekcja Funkcjonalności */}
            <section className="py-20 bg-gradient-to-b from-white to-gray-100 relative overflow-hidden">
                <h2 className="text-4xl font-bold text-center mb-12 text-indigo-700" data-aos="fade-up">
                    Key Features of ContractorFoil
                </h2>
                <div
                    className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 relative z-10">
                    {/* Feature: Contractor Tracking */}
                    <div
                        className="p-8 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                        data-aos="fade-right">
                        <div className="flex items-center justify-center mb-4 text-indigo-600 text-6xl">
                            <FiPhoneCall/>
                        </div>
                        <h3 className="font-semibold text-2xl mb-4 text-gray-800">Contractor Tracking</h3>
                        <p className="text-gray-600">Monitor each contractor's performance, schedule, and tasks to stay
                            organized and efficient.</p>
                    </div>

                    {/* Feature: Route Optimization */}
                    <div
                        className="p-8 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                        data-aos="fade-up">
                        <div className="flex items-center justify-center mb-4 text-green-500 text-6xl">
                            <BiCar/>
                        </div>
                        <h3 className="font-semibold text-2xl mb-4 text-gray-800">Route Optimization</h3>
                        <p className="text-gray-600">Save time and fuel costs with our smart route planning tool.</p>
                    </div>

                    {/* Feature: Analytics & Reporting */}
                    <div
                        className="p-8 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                        data-aos="fade-left">
                        <div className="flex items-center justify-center mb-4 text-blue-500 text-6xl">
                            <FiTrendingUp/>
                        </div>
                        <h3 className="font-semibold text-2xl mb-4 text-gray-800">Analytics & Reporting</h3>
                        <p className="text-gray-600">Gain insights into your operations with real-time analytics and
                            generate custom reports.</p>
                    </div>

                    {/* Feature: Automated Reminders */}
                    <div
                        className="p-8 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                        data-aos="fade-right">
                        <div className="flex items-center justify-center mb-4 text-yellow-500 text-6xl">
                            <FiUserCheck/>
                        </div>
                        <h3 className="font-semibold text-2xl mb-4 text-gray-800">Automated Reminders</h3>
                        <p className="text-gray-600">Never miss a deadline with automated reminders for both you and
                            your contractors.</p>
                    </div>

                    {/* Feature: Collaboration Tools */}
                    <div
                        className="p-8 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                        data-aos="fade-up">
                        <div className="flex items-center justify-center mb-4 text-purple-500 text-6xl">
                            <FiUsers/>
                        </div>
                        <h3 className="font-semibold text-2xl mb-4 text-gray-800">Collaboration Tools</h3>
                        <p className="text-gray-600">Keep your team connected and work together seamlessly with
                            real-time updates.</p>
                    </div>

                    {/* Feature: Data Security */}
                    <div
                        className="p-8 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                        data-aos="fade-left">
                        <div className="flex items-center justify-center mb-4 text-red-500 text-6xl">
                            <FiShield/>
                        </div>
                        <h3 className="font-semibold text-2xl mb-4 text-gray-800">Data Security</h3>
                        <p className="text-gray-600">Protect your data with top-notch encryption and secure access
                            controls.</p>
                    </div>
                </div>
            </section>


            {/* Sekcja FAQ */}
            <section className="py-20 bg-gradient-to-b from-gray-100 to-white text-gray-900">
                <h2 className="text-4xl font-bold mb-10 text-center text-indigo-700" data-aos="fade-up">
                    Frequently Asked Questions
                </h2>
                <div className="max-w-3xl mx-auto px-4 space-y-4">
                    <details
                        className="group bg-white shadow-lg rounded-lg p-4 transition-all duration-300 ease-in-out overflow-hidden"
                        data-aos="fade-up">
                        <summary
                            className="font-semibold text-lg cursor-pointer text-indigo-600 flex justify-between items-center transition-colors duration-200 hover:text-indigo-800">
                            What is ContractorFoil?
                            <span className="transform transition-transform group-open:rotate-180">
                    ▼
                </span>
                        </summary>
                        <p className="mt-2 text-gray-700 transition-opacity duration-300 ease-in-out opacity-0 group-open:opacity-100">
                            ContractorFoil is a comprehensive contractor management solution that helps you organize,
                            track, and communicate with contractors efficiently.
                        </p>
                    </details>

                    <details
                        className="group bg-white shadow-lg rounded-lg p-4 transition-all duration-300 ease-in-out overflow-hidden"
                        data-aos="fade-up">
                        <summary
                            className="font-semibold text-lg cursor-pointer text-indigo-600 flex justify-between items-center transition-colors duration-200 hover:text-indigo-800">
                            How does the route optimization feature work?
                            <span className="transform transition-transform group-open:rotate-180">
                    ▼
                </span>
                        </summary>
                        <p className="mt-2 text-gray-700 transition-opacity duration-300 ease-in-out opacity-0 group-open:opacity-100">
                            Our route optimization feature uses advanced algorithms to suggest the most efficient route
                            for your contractors, saving time and fuel costs.
                        </p>
                    </details>

                    <details
                        className="group bg-white shadow-lg rounded-lg p-4 transition-all duration-300 ease-in-out overflow-hidden"
                        data-aos="fade-up">
                        <summary
                            className="font-semibold text-lg cursor-pointer text-indigo-600 flex justify-between items-center transition-colors duration-200 hover:text-indigo-800">
                            Is ContractorFoil secure?
                            <span className="transform transition-transform group-open:rotate-180">
                    ▼
                </span>
                        </summary>
                        <p className="mt-2 text-gray-700 transition-opacity duration-300 ease-in-out opacity-0 group-open:opacity-100">
                            Yes, we use enterprise-grade encryption and strict security protocols to ensure your data is
                            safe.
                        </p>
                    </details>

                    <details
                        className="group bg-white shadow-lg rounded-lg p-4 transition-all duration-300 ease-in-out overflow-hidden"
                        data-aos="fade-up">
                        <summary
                            className="font-semibold text-lg cursor-pointer text-indigo-600 flex justify-between items-center transition-colors duration-200 hover:text-indigo-800">
                            Can I customize the features of ContractorFoil?
                            <span className="transform transition-transform group-open:rotate-180">
                    ▼
                </span>
                        </summary>
                        <p className="mt-2 text-gray-700 transition-opacity duration-300 ease-in-out opacity-0 group-open:opacity-100">
                            Absolutely! ContractorFoil is designed to be flexible, allowing you to tailor it to your
                            specific business needs.
                        </p>
                    </details>
                </div>
            </section>


            {/* Sekcja kontaktowa */}
            <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-center">
                <h2 className="text-4xl font-bold mb-10" data-aos="fade-up">
                    Contact Us
                </h2>
                <p className="mb-8 max-w-2xl mx-auto" data-aos="fade-up">
                    Have questions? We'd love to hear from you. Fill out the form below and our team will get back to
                    you shortly.
                </p>
                <div className="max-w-lg mx-auto">
                    <form className="bg-white rounded-lg p-6 shadow-lg text-gray-900" data-aos="fade-up">
                        <div className="mb-4">
                            <label htmlFor="name" className="block font-semibold mb-2">Name</label>
                            <input type="text" id="name"
                                   className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                   placeholder="Your Name"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block font-semibold mb-2">Email</label>
                            <input type="email" id="email"
                                   className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                   placeholder="Your Email"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block font-semibold mb-2">Message</label>
                            <textarea id="message" rows={4}
                                      className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                      placeholder="Your Message"></textarea>
                        </div>
                        <button type="submit"
                                className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-full hover:bg-indigo-700 transition-transform transform hover:scale-110">
                            Send Message
                        </button>
                    </form>
                </div>
            </section>


            {/* Footer */}
            <Footer/>
        </div>
    );
};

export default LandingPage;