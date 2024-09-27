import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import AOS from "aos";
import "aos/dist/aos.css";
import "../CSS/Register.css";

const Register: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [passwordValidations, setPasswordValidations] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false
    });
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({
            duration: 1200,
            easing: "ease-in-out-back",
        });
    }, []);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset errors
        setError(null);

        // Sprawdzenie czy wszystkie zasady hasła są spełnione
        if (!Object.values(passwordValidations).every(Boolean)) {
            setError("Password does not meet all the requirements");
            return;
        }

        // Sprawdzenie czy hasła się zgadzają
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const data = await registerUser(email, password);

            // Sprawdzenie, czy serwer zwrócił błąd istniejącego emaila
            if (data.error && data.error === "User already exists") {
                setError("This email is already registered.");
            } else if (data.token) {
                // Przekierowanie po udanej rejestracji
                navigate("/dashboard");
            }
        } catch (err) {
            setError("Registration failed. Try again.");
        }
    };

    // Funkcja walidacji siły hasła w czasie rzeczywistym
    const validatePassword = (password: string) => {
        setPassword(password);
        setPasswordValidations({
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            specialChar: /[!@#$%^&*]/.test(password)
        });
    };

    return (
        <div data-aos="zoom-up" className="register-container">
            <h2 className="text-4xl pb-8 text-gray-700">Register</h2>
            {error && <p className="pb-5" style={{ color: "red" }}>{error}</p>}
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
                    onChange={(e) => validatePassword(e.target.value)} // Sprawdzanie hasła w czasie rzeczywistym
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                {/* Wskazówki dotyczące siły hasła */}
                {password && (
                    <div data-aos="flip-up" className="password-requirements active">
                        <p className={passwordValidations.length ? "valid" : "invalid"}>
                            Minimum 8 characters
                        </p>
                        <p className={passwordValidations.uppercase ? "valid" : "invalid"}>
                            At least one uppercase letter (A-Z)
                        </p>
                        <p className={passwordValidations.lowercase ? "valid" : "invalid"}>
                            At least one lowercase letter (a-z)
                        </p>
                        <p className={passwordValidations.number ? "valid" : "invalid"}>
                            At least one number (0-9)
                        </p>
                        <p className={passwordValidations.specialChar ? "valid" : "invalid"}>
                            At least one special character (!@#$%^&*)
                        </p>
                    </div>
                )}

                <button onSubmit={handleRegister} type="submit">Register</button>
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