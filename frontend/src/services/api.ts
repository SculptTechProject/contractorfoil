const API_URL = /*"https://contractorfoil.onrender.com"*/"http://localhost:5173";

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
export const registerUser = async (email: string, password: string, captchaToken: string) => {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, captchaToken }), // Wysyłanie email, password i captchaToken
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

// Logout user
export const logoutUser = () => {
  localStorage.removeItem("userToken"); // Remove JWT token from localStorage
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
    throw new Error(`Failed to fetch contractor with ID ${id}: ${errorMessage}`);
  }

  return await response.json();
};

// Update contractor
export const updateContractor = async (contractorId: string, contractorData: any) => {
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