const API_URL =  "https://contractorfoil.onrender.com" /* "http://localhost:5173" */;

// Function to get JWT token from localStorage
const getToken = () => {
  return localStorage.getItem("userToken");
};

// Function to configure headers with JWT token
const getHeaders = () => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Register new user
export const registerUser = async (
  name: string,
  email: string,
  password: string,
  captchaToken?: string
) => {
  const bodyData: any = { name, email, password };

  // Sprawdzenie, czy używać reCAPTCHA
  const useRecaptcha = process.env.REACT_APP_USE_RECAPTCHA === "true";

  if (useRecaptcha) {
    bodyData.captchaToken = captchaToken;
  }

  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyData),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to register user: ${errorMessage}`);
  }

  return await response.json();
};

// Login user
export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to login: ${errorMessage}`);
  }

  return await response.json();
};

export const getUserNameFromToken = (): string | null => {
  const token = getToken();
  if (!token) {
    return null;
  }

  try {
    // Podziel token na części (nagłówek, payload, podpis)
    const base64Url = token.split(".")[1];
    if (!base64Url) {
      throw new Error("Invalid token format");
    }

    // Rozkoduj Base64 (bez paddingu)
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    // Parsuj dane payload jako JSON
    const payload = JSON.parse(jsonPayload);
    return payload.name || null; // Zakładając, że imię użytkownika jest zapisane jako `name`
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};


// Logout user
export const logoutUser = () => {
  localStorage.removeItem("userToken"); // Remove JWT token from localStorage
  localStorage.removeItem("userName"); // Remove userName token from localStorage
};

// Fetch all contractors
export const fetchContractors = async () => {
  const response = await fetch(`${API_URL}/api/contractors`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to fetch contractors: ${errorMessage}`);
  }

  return await response.json();
};

// Add new contractor
export const addContractor = async (contractorData: any) => {
  const response = await fetch(`${API_URL}/api/contractors`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(contractorData),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to add contractor: ${errorMessage}`);
  }

  return await response.json();
};

// Delete contractor
export const deleteContractor = async (contractorId: string) => {
  const response = await fetch(`${API_URL}/api/contractors/${contractorId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to delete contractor: ${errorMessage}`);
  }

  return await response.json();
};

// Fetch contractor by ID
export const fetchContractorById = async (id: string) => {
  const response = await fetch(`${API_URL}/api/contractors/${id}`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(
      `Failed to fetch contractor with ID ${id}: ${errorMessage}`
    );
  }

  return await response.json();
};

// Update contractor
export const updateContractor = async (
  contractorId: string,
  contractorData: any
) => {
  if (!contractorId) {
    throw new Error("Contractor ID is required for update");
  }

  const response = await fetch(`${API_URL}/api/contractors/${contractorId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(contractorData),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to update contractor: ${errorMessage}`);
  }

  return await response.json();
};
