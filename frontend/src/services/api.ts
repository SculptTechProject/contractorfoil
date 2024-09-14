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
  const response = await fetch(`${API_URL}/contractors`, {
    method: "GET",
    headers: getHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch contractors");
  }

  return data;
};

// Dodawanie kontrahenta (autoryzowane)
export const addContractor = async (newContractor: any) => {
  const response = await fetch(`${API_URL}/contractors`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(newContractor),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to add contractor");
  }

  return data;
};

// Usuwanie kontrahenta (autoryzowane)
export const deleteContractor = async (contractorId: string) => {
  const response = await fetch(`${API_URL}/contractors/${contractorId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete contractor");
  }

  return true; // Zwracamy `true` jeśli kontrahent został pomyślnie usunięty
};


// Aktualizowanie kontrahenta (autoryzowane)
export const updateContractor = async (id: string, updatedContractor: any) => {
  const response = await fetch(`${API_URL}/contractors/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(updatedContractor),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update contractor");
  }

  return data;
};