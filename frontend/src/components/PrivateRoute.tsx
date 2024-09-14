import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const user = localStorage.getItem("userToken"); // Sprawdzenie, czy token istnieje
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
