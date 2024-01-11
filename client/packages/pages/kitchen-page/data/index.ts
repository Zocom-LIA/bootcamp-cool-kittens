export const filteredOrderData = () => {
  const today = new Date();
  const todaysDate = today.toISOString().split("T")[0] + "T00:00:00";

  return {
    async fetchFilteredOrders(status: string){
      try {
        const BASE_URL = import.meta.env.VITE_API_BASE_URL
        const API_ENDPOINT = `/filterOrders/${status}?timeStamp=${todaysDate}`
        const API_URL = BASE_URL + API_ENDPOINT

        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            authorization: `${import.meta.env.VITE_AUTH_API_KEY}`
          }
        })
        return await response.json()
      } catch (error) {
        console.error(error, `Failed to fetch ${status} orders`);
      }
    }
  }
}