import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ContractorsPage from "./components/ContractorsPage";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./components/HomePage";
import ErrorPage from "./components/ErrorPage";

const App: React.FC = () => {
  // @ts-ignore
  return (
    <Router>
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
              <div>
                <ContractorsPage />
              </div>
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
