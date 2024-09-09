import React from "react";
import ContractorForm from "./components/ContractorForm";
import ContractorsList from "./components/ContractorsList";


function App() {
  return (
    <div className="App">
      <h1>ContractorFoil</h1>
      <ContractorForm />
      <ContractorsList />
    </div>
  );
}

export default App;
