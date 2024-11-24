import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../index.css";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import { FaDollarSign } from "react-icons/fa";
import Bubble from "./../Bubble";
import { BiCar } from "react-icons/bi";
import {
  FiPhoneCall,
  FiShield,
  FiTrendingUp,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";
import "../../CSS/HomePage.css";

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
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover">(
    "default"
  );

  const handleSignUpBtn = () => {
    navigate("/register"); // Tutaj używasz navigate do przekierowania
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

  const variants: Record<
    "default" | "hover",
    { x: number; y: number; scale: number; background: string }
  > = {
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
    const initialBubbles = Array.from({ length: 35 }, createBubble);
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-200 via-teal-300 to-blue-400">
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

      <header className="absolute z-50 top-4 right-4">
        <button
          onClick={handleLoginClick}
          className="px-4 py-2 font-bold text-teal-900 transition-transform transform bg-yellow-300 rounded-full hover:bg-yellow-400 hover:scale-110"
        >
          Log In
        </button>
      </header>

      <section
        className="flex flex-col items-center justify-center min-h-screen px-4 py-20 text-center bg-gradient-to-br from-green-200 via-teal-300 to-blue-400"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h1
          className="mb-6 text-3xl font-extrabold tracking-wider text-teal-900 md:text-5xl lg:text-6xl"
          data-aos="fade-down"
        >
          Welcome to <span className="animate-colorChange">ContractorFoil</span>
        </h1>
        <p
          className="max-w-lg mb-10 text-lg text-gray-800 md:text-xl lg:text-2xl"
          data-aos="fade-up"
        >
          Manage contractors with efficiency and modern tools.
        </p>
        <button
          className="z-50 px-8 py-3 mb-6 font-bold text-teal-900 transition-transform transform bg-yellow-300 rounded-full md:mb-10 hover:bg-yellow-400 hover:scale-110"
          data-aos="zoom-in"
          onClick={handleGetStartedClick}
        >
          Get Started
        </button>

        {/* Paralaksa - Tło */}
        <div
          className="absolute inset-0 z-0 bg-center bg-cover opacity-20"
          style={{
            transform: `translate(${mousePos.x * 0.05}px, ${
              mousePos.y * 0.05
            }px)`,
          }}
        ></div>
      </section>

      {/* Call to Action */}
      <section
        className="relative flex flex-col items-center justify-center min-h-screen pb-12 overflow-hidden text-center text-white md:py-20 bg-gradient-to-r from-indigo-600 to-purple-600"
        ref={targetSectionRef}
      >
        {/* Tytuł i opis */}
        <h2
          className="relative z-10 mx-10 mb-6 text-2xl font-bold px- md:text-5xl"
          data-aos="fade-up"
        >
          Take Control of Contractor Management
        </h2>
        <p
          className="relative z-10 max-w-2xl mx-auto mb-8 text-lg"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Join hundreds of users revolutionizing their workflow with
          ContractorFoil.
        </p>

        {/* Ikony z korzyściami */}
        <div
          className="relative z-10 flex flex-col justify-center gap-6 mb-12 md:flex-row md:gap-12"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="flex flex-col items-center">
            <div className="p-4 mb-4 text-indigo-600 transition-transform transform bg-white rounded-full shadow-lg hover:scale-110">
              {/* Ikona */}
              <svg
                className="w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2a8 8 0 11-8 8 8 8 0 018-8zm1 8V7h-2v6h4v-2h-2z" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-white">Save Time</p>
            <p className="max-w-xs text-sm text-gray-300">
              Automate your contractor management tasks with ease.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-4 mb-4 text-indigo-600 transition-transform transform bg-white rounded-full shadow-lg hover:scale-110">
              {/* Ikona dolara */}
              <FaDollarSign className="w-10 h-10" />
            </div>
            <p className="text-lg font-semibold text-white">Optimize Costs</p>
            <p className="max-w-xs text-sm text-gray-300">
              Reduce expenses with optimized contractor routes and schedules.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-4 mb-4 text-indigo-600 transition-transform transform bg-white rounded-full shadow-lg hover:scale-110">
              <svg
                className="w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2a8 8 0 11-8 8 8 8 8 0 018-8zm1 8V7h-2v6h4v-2h-2z" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-white">
              Boost Productivity
            </p>
            <p className="max-w-xs text-sm text-gray-300">
              Keep your contractors on track with smart scheduling.
            </p>
          </div>
        </div>

        {/* Przyciski akcji */}
        <div className="relative z-10 flex justify-center space-x-4">
          <button
            onClick={handleSignUpBtn}
            className="px-8 py-3 font-bold text-indigo-600 transition-transform transform bg-white rounded-full shadow-lg hover:bg-indigo-100 hover:scale-110"
          >
            Sign Up Now
          </button>
          <button
            onClick={() => navigate("/learn-more")}
            className="px-8 py-3 font-bold text-white transition-transform transform bg-indigo-600 border border-white rounded-full shadow-lg hover:bg-indigo-700 hover:scale-110"
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
        <h2 className="mb-12 text-4xl font-bold text-center" data-aos="fade-up">
          Evolution of ContractorFoil
        </h2>
        <div className="max-w-5xl px-6 mx-auto">
          <div className="relative">
            <div className="absolute top-0 h-full transform -translate-x-1/2 border-l-4 border-teal-500 left-1/2"></div>
            <div className="space-y-8">
              {/* Idea */}
              <div className="flex items-center space-x-6">
                <div
                  data-aos="fade-right"
                  className="flex items-center justify-center w-24 h-12 px-4 font-bold text-white bg-teal-500 rounded-full"
                >
                  10.06.2023
                </div>
                <div
                  className="max-w-md p-6 bg-white rounded-lg shadow-lg"
                  data-aos="fade-right"
                >
                  <h3 data-aos="fade-right" className="text-xl font-semibold">
                    The Idea
                  </h3>
                  <p>
                    ContractorFoil started as an idea to solve the challenges in
                    contractor management faced by small businesses.
                  </p>
                </div>
              </div>
              {/* Prototype */}
              <div className="flex items-center justify-end space-x-6">
                <div
                  className="max-w-md p-6 bg-white rounded-lg shadow-lg"
                  data-aos="fade-left"
                >
                  <h3 data-aos="fade-left" className="text-xl font-semibold">
                    Prototype
                  </h3>
                  <p>
                    Our initial prototype was built and tested by a small group
                    of users. We received valuable feedback that shaped the
                    future of the product.
                  </p>
                </div>
                <div
                  data-aos="fade-left"
                  className="flex items-center justify-center w-24 h-12 px-4 font-bold text-white bg-teal-500 rounded-full"
                >
                  21.11.2023
                </div>
              </div>
              {/* Launch*/}
              <div className="flex items-center space-x-6">
                <div
                  data-aos="fade-right"
                  className="flex items-center justify-center w-24 h-12 px-4 font-bold text-white bg-teal-500 rounded-full"
                >
                  14.04.2024
                </div>
                <div
                  className="max-w-md p-6 bg-white rounded-lg shadow-lg"
                  data-aos="fade-right"
                >
                  <h3 data-aos="fade-right" className="text-xl font-semibold">
                    Launch
                  </h3>
                  <p>
                    ContractorFoil officially launched with essential features
                    to help businesses manage their contractors effectively.
                  </p>
                </div>
              </div>
              {/* Advanced */}
              <div className="flex items-center justify-end space-x-6">
                <div
                  className="max-w-md p-6 bg-white rounded-lg shadow-lg"
                  data-aos="fade-left"
                >
                  <h3 data-aos="fade-left" className="text-xl font-semibold">
                    Advanced Features
                  </h3>
                  <p>
                    New features like route optimization and real-time
                    collaboration were added, setting us apart from competitors.
                  </p>
                </div>
                <div
                  data-aos="fade-left"
                  className="flex items-center justify-center w-24 h-12 px-4 font-bold text-white bg-teal-500 rounded-full"
                >
                  28.07.2024
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sekcja Funkcjonalności */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-gray-100">
        <h2
          className="mb-12 text-4xl font-bold text-center text-indigo-700"
          data-aos="fade-up"
        >
          Key Features of ContractorFoil
        </h2>
        <div className="relative z-10 grid max-w-6xl grid-cols-1 gap-8 px-4 mx-auto md:grid-cols-2 lg:grid-cols-3">
          {/* Feature: Contractor Tracking */}
          <div
            className="p-8 transition-transform duration-300 transform bg-white rounded-lg shadow-lg hover:scale-105"
            data-aos="fade-right"
          >
            <div className="flex items-center justify-center mb-4 text-6xl text-indigo-600">
              <FiPhoneCall />
            </div>
            <h3 className="mb-4 text-2xl font-semibold text-gray-800">
              Contractor Tracking
            </h3>
            <p className="text-gray-600">
              Monitor each contractor's performance, schedule, and tasks to stay
              organized and efficient.
            </p>
          </div>

          {/* Feature: Route Optimization */}
          <div
            className="p-8 transition-transform duration-300 transform bg-white rounded-lg shadow-lg hover:scale-105"
            data-aos="fade-up"
          >
            <div className="flex items-center justify-center mb-4 text-6xl text-green-500">
              <BiCar />
            </div>
            <h3 className="mb-4 text-2xl font-semibold text-gray-800">
              Route Optimization
            </h3>
            <p className="text-gray-600">
              Save time and fuel costs with our smart route planning tool.
            </p>
          </div>

          {/* Feature: Analytics & Reporting */}
          <div
            className="p-8 transition-transform duration-300 transform bg-white rounded-lg shadow-lg hover:scale-105"
            data-aos="fade-left"
          >
            <div className="flex items-center justify-center mb-4 text-6xl text-blue-500">
              <FiTrendingUp />
            </div>
            <h3 className="mb-4 text-2xl font-semibold text-gray-800">
              Analytics & Reporting
            </h3>
            <p className="text-gray-600">
              Gain insights into your operations with real-time analytics and
              generate custom reports.
            </p>
          </div>

          {/* Feature: Automated Reminders */}
          <div
            className="p-8 transition-transform duration-300 transform bg-white rounded-lg shadow-lg hover:scale-105"
            data-aos="fade-right"
          >
            <div className="flex items-center justify-center mb-4 text-6xl text-yellow-500">
              <FiUserCheck />
            </div>
            <h3 className="mb-4 text-2xl font-semibold text-gray-800">
              Automated Reminders
            </h3>
            <p className="text-gray-600">
              Never miss a deadline with automated reminders for both you and
              your contractors.
            </p>
          </div>

          {/* Feature: Collaboration Tools */}
          <div
            className="p-8 transition-transform duration-300 transform bg-white rounded-lg shadow-lg hover:scale-105"
            data-aos="fade-up"
          >
            <div className="flex items-center justify-center mb-4 text-6xl text-purple-500">
              <FiUsers />
            </div>
            <h3 className="mb-4 text-2xl font-semibold text-gray-800">
              Collaboration Tools
            </h3>
            <p className="text-gray-600">
              Keep your team connected and work together seamlessly with
              real-time updates.
            </p>
          </div>

          {/* Feature: Data Security */}
          <div
            className="p-8 transition-transform duration-300 transform bg-white rounded-lg shadow-lg hover:scale-105"
            data-aos="fade-left"
          >
            <div className="flex items-center justify-center mb-4 text-6xl text-red-500">
              <FiShield />
            </div>
            <h3 className="mb-4 text-2xl font-semibold text-gray-800">
              Data Security
            </h3>
            <p className="text-gray-600">
              Protect your data with top-notch encryption and secure access
              controls.
            </p>
          </div>
        </div>
      </section>

      {/* Sekcja FAQ */}
      <section className="py-20 text-gray-900 bg-gradient-to-b from-gray-100 to-white">
        <h2
          className="mb-10 text-4xl font-bold text-center text-indigo-700"
          data-aos="fade-up"
        >
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl px-4 mx-auto space-y-4">
          <details
            className="p-4 overflow-hidden transition-all duration-300 ease-in-out bg-white rounded-lg shadow-lg group"
            data-aos="fade-up"
          >
            <summary className="flex items-center justify-between text-lg font-semibold text-indigo-600 transition-colors duration-200 cursor-pointer hover:text-indigo-800">
              What is ContractorFoil?
              <span className="transition-transform transform group-open:rotate-180">
                ▼
              </span>
            </summary>
            <p className="mt-2 text-gray-700 transition-opacity duration-300 ease-in-out opacity-0 group-open:opacity-100">
              ContractorFoil is a comprehensive contractor management solution
              that helps you organize, track, and communicate with contractors
              efficiently.
            </p>
          </details>

          <details
            className="p-4 overflow-hidden transition-all duration-300 ease-in-out bg-white rounded-lg shadow-lg group"
            data-aos="fade-up"
          >
            <summary className="flex items-center justify-between text-lg font-semibold text-indigo-600 transition-colors duration-200 cursor-pointer hover:text-indigo-800">
              How does the route optimization feature work?
              <span className="transition-transform transform group-open:rotate-180">
                ▼
              </span>
            </summary>
            <p className="mt-2 text-gray-700 transition-opacity duration-300 ease-in-out opacity-0 group-open:opacity-100">
              Our route optimization feature uses advanced algorithms to suggest
              the most efficient route for your contractors, saving time and
              fuel costs.
            </p>
          </details>

          <details
            className="p-4 overflow-hidden transition-all duration-300 ease-in-out bg-white rounded-lg shadow-lg group"
            data-aos="fade-up"
          >
            <summary className="flex items-center justify-between text-lg font-semibold text-indigo-600 transition-colors duration-200 cursor-pointer hover:text-indigo-800">
              Is ContractorFoil secure?
              <span className="transition-transform transform group-open:rotate-180">
                ▼
              </span>
            </summary>
            <p className="mt-2 text-gray-700 transition-opacity duration-300 ease-in-out opacity-0 group-open:opacity-100">
              Yes, we use enterprise-grade encryption and strict security
              protocols to ensure your data is safe.
            </p>
          </details>

          <details
            className="p-4 overflow-hidden transition-all duration-300 ease-in-out bg-white rounded-lg shadow-lg group"
            data-aos="fade-up"
          >
            <summary className="flex items-center justify-between text-lg font-semibold text-indigo-600 transition-colors duration-200 cursor-pointer hover:text-indigo-800">
              Can I customize the features of ContractorFoil?
              <span className="transition-transform transform group-open:rotate-180">
                ▼
              </span>
            </summary>
            <p className="mt-2 text-gray-700 transition-opacity duration-300 ease-in-out opacity-0 group-open:opacity-100">
              Absolutely! ContractorFoil is designed to be flexible, allowing
              you to tailor it to your specific business needs.
            </p>
          </details>
        </div>
      </section>

      {/* Sekcja kontaktowa */}
      <section className="px-4 py-10 text-center text-white shadow-lg sm:py-8 bg-gradient-to-br from-blue-600 to-indigo-600">
        <h2 className="mb-8 text-3xl font-bold sm:text-2xl" data-aos="fade-up">
          Contact Us
        </h2>
        <p
          className="max-w-md mx-auto mb-6 text-sm sm:text-xs"
          data-aos="fade-up"
        >
          Have questions? We'd love to hear from you. Fill out the form below
          and our team will get back to you shortly.
        </p>
        <div className="max-w-md mx-auto sm:max-w-sm">
          <form
            className="p-4 text-gray-900 bg-white rounded-lg shadow-lg sm:p-3"
            data-aos="fade-up"
          >
            <div className="mb-3">
              <label
                htmlFor="name"
                className="block mb-1 text-sm font-semibold"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-semibold"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none"
                placeholder="Your Email"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="message"
                className="block mb-1 text-sm font-semibold"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={3}
                className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none"
                placeholder="Your Message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-bold text-white transition-transform transform bg-indigo-600 rounded-full hover:bg-indigo-700 hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
