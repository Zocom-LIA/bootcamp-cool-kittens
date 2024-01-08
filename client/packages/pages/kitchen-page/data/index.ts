
export const fetchOrdersFromApi = async () => {
    try {
    const response = await fetch("YOUR_API_ENDPOINT");
    const data = await response.json();
    return data;
    } catch (error) {
    console.error("Error fetching orders:", error);
      throw error; // Rethrow the error for the component to handle
    }
};