import React from "react";
import "../CSS/HomePage.css";

const HomePage: React.FC = () => {
  return (
    <div className="home-page ">
      <h1>Welcome to ContractorFoil</h1>
      <p>
        This is the main page of the project, where you can learn more about the
        features of ContractorFoil.
      </p>
      <p>
        <a href="/login">Login</a> or <a href="/register">Register</a> to start
        using the application.
      </p>
    </div>
  );
};

export default HomePage;
