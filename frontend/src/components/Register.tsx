import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {registerUser} from "../services/api";
import "../CSS/Register.css";

const Register: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // Sprawdzenie czy hasła się zgadzają
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const data = await registerUser(email, password);
            if (data.token) {
                navigate("/dashboard"); // Przekierowanie po udanej rejestracji
            }
        } catch (err) {
            setError("Registration failed. Try again.");
        }
    };

    return (
        <div className="register-container">
            <h2 className="text-4xl pb-8 text-gray-700">Register</h2>
            {error && <p style={{color: "red"}}>{error}</p>}
            <form className="register-form" onSubmit={handleRegister}>
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            <div className="register-footer text-center text-gray-600">
                <div className="pt-6">
                    <p>Already have an account? <a className="text-emerald-900" href="/login">Login</a></p>
                </div>
                <div className="pt-2 text-xs text-emerald-900">
                    <a className="" href="/">Home Page</a>
                </div>
            </div>
        </div>
    );
};

export default Register;
