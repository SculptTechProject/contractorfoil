import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import "../CSS/Login.css"

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await loginUser(email, password);
      if (data.token) {
        navigate("/dashboard"); // Przekierowanie po udanym logowaniu
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="text-4xl pb-8 text-gray-700">Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
