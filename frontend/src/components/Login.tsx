import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import AOS from "aos";
import "aos/dist/aos.css";
import "../CSS/Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out-back",
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Zapobieganie przeładowaniu strony

    try {
      const data = await loginUser(email, password); // Wysyłanie żądania do API
      if (data.token) {
        // Zapisanie tokenu JWT w localStorage
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userName", data.name); // Przechowujemy imię w localStorage
        setUserName(data.name); // Ustawiamy imię użytkownika w stanie

        // Przekierowanie na dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <div
      data-aos="zoom-up"
      className="login-container bg-gradient-to-r from-blue-500 to-indigo-600"
    >
      <h2 className="pb-6 text-4xl text-white">Login</h2>
      {error && (
        <p className="pb-2" style={{ color: "red" }}>
          {error}
        </p>
      )}
      <div className="bg-white shadow-2xl rounded-xl">
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="loginBtn" onClick={handleLogin} type="submit">
            Login
          </button>
        </form>
      </div>
      {userName && <h1>Welcome, {userName}!</h1>}
      <div className="text-center text-gray-200 register-footer">
        <div className="pt-6">
          <p>
            Do not have an account?{" "}
            <a
              className="transition-all text-sky-400 outline-white hover:text-white"
              href="/register"
            >
              Register
            </a>
          </p>
        </div>
        <div className="pt-2 text-xs ">
          <a
            className="transition-all text-sky-400 outline-white hover:text-white"
            href="/"
          >
            Home Page
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
