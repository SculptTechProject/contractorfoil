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

        // Przekierowanie na dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
      <div data-aos="zoom-up" className="login-container">
        <h2 className="text-4xl pb-6 text-gray-700">Login</h2>
        {error && <p className="pb-2" style={{ color: "red" }}>{error}</p>}
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
          <button type="submit">Login</button>
        </form>
        <div className="register-footer text-center text-gray-600">
          <div className="pt-6">
            <p>Do not have an account? <a className="text-emerald-900" href="/register">Register</a></p>
          </div>
          <div className="pt-2 text-xs text-emerald-900">
            <a className="" href="/">Home Page</a>
          </div>
        </div>
      </div>
  );
};

export default Login;