const API_URL = "http://localhost:5173/api/auth";

// Funkcja do pobierania tokenu JWT z localStorage
const getToken = () => {
  return localStorage.getItem("userToken");
};

// Funkcja do konfiguracji nagłówków z tokenem JWT
const getHeaders = () => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // Dołączanie tokenu JWT do nagłówka
  };
};

// Rejestracja nowego użytkownika
export const registerUser = async (email: string, password: string) => {
  const response = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to register user");
  }

  const data = await response.json();
  return data;
};

// Logowanie użytkownika
export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error("Failed to login");
  }
  return await response.json();
};


// Wylogowanie użytkownika (czyszczenie tokenu JWT)
export const logoutUser = () => {
  localStorage.removeItem("userToken"); // Usunięcie tokenu JWT z localStorage
};

// Pobieranie kontrahentów (autoryzowane)
export const fetchContractors = async () => {
  const token = localStorage.getItem("userToken");

  const response = await fetch("http://localhost:5173/api/contractors", {  // Zmiana ścieżki
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch contractors");
  }

  const data = await response.json();
  return data;
};

// Dodawanie kontrahenta (autoryzowane)
export const addContractor = async (contractorData: any) => {
  const token = localStorage.getItem("userToken");

  const response = await fetch("http://localhost:5173/api/contractors", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contractorData),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to add contractor: ${errorMessage}`);
  }

  return await response.json(); // Odczytanie odpowiedzi tylko raz
};

// Usuwanie kontrahenta (autoryzowane)
export const deleteContractor = async (contractorId: string) => {
  const token = localStorage.getItem("userToken"); // Pobranie tokena JWT

  if (!token) {
    throw new Error("No token found. Please login again.");
  }

  const response = await fetch(`http://localhost:5173/api/contractors/${contractorId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, // Użycie tokena w nagłówku
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to delete contractor: ${errorMessage}`);
  }

  return await response.json();
};

export const fetchContractorById = async (id: string) => {
  const token = localStorage.getItem("userToken");

  const response = await fetch(`http://localhost:5173/api/contractors/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch contractor with ID: ${id}`);
  }

  return await response.json();
};

// Aktualizowanie kontrahenta (autoryzowane)
export const updateContractor = async (contractorId: string, contractorData: any) => {
  const token = localStorage.getItem("userToken");

  if (!contractorId) {
    throw new Error("Contractor ID is required for update");
  }

  const response = await fetch(`http://localhost:5173/api/contractors/${contractorId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contractorData),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to update contractor: ${errorMessage}`);
  }

  return await response.json();
};