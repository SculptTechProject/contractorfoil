const API_URL = "http://localhost:5173/api/contractors";

export const fetchContractors = async () => {
  try {
    const response = await fetch(API_URL);
    console.log("Response:", response);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching contractors:", error);
  }
};


export const addContractor = async (contractor: any) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contractor),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding contractor:", error);
  }
};
