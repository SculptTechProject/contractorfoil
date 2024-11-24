import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import ContractorsPage from "./components/Pages/ContractorsPage";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./components/Pages/HomePage";
import ErrorPage from "./components/ErrorPage";
import ContractorDetails from "./components/Pages/ContractorDetalis";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/Pages/Dashboard"

const App: React.FC = () => {
  return (
    <Router>
        {/* ToastContainer musi być tylko raz w drzewie komponentów */}
        <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Domyślna strona główna */}
        <Route path="/" element={<HomePage />} />

        {/* Publiczne trasy */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Chroniona trasa - tylko dla zalogowanych użytkowników */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/contractors"
          element={
            <PrivateRoute>
              <div>
                <ContractorsPage/>
              </div>
            </PrivateRoute>
          }
        />

        {/* Trasa dla szczegółów kontrahenta */}
        <Route
            path="/contractors/:id"
            element={
              <PrivateRoute>
                <ContractorDetails />
              </PrivateRoute>
            }
        />

        {/* Jeśli użytkownik wpisze złą trasę, przekierowujemy na stronę główną */}
        <Route path="*" element={<ErrorPage />}/>
      </Routes>
    </Router>
  );
};

export default App;
