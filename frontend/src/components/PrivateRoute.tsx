import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const userToken = localStorage.getItem("userToken"); // Sprawdzenie istnienia tokenu

  // Jeśli token istnieje, pokaż komponent (czyli dashboard)
  return userToken ? children : <Navigate to="/login" />;
};

export default PrivateRoute;