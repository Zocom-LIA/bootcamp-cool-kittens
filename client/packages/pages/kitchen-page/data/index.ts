
export const filteredOrderData = () => {
  const today = new Date();
  const todaysDate = today.toISOString().split("T")[0] + "T00:00:00";

  return {
    async fetchFilteredOrders(status: string){
      try {
        const URL = `https://s1ev3z9454.execute-api.eu-north-1.amazonaws.com/api/filterOrders/${status}?timeStamp=${todaysDate}`;
        const response = await fetch(URL)
        return await response.json()
      } catch (error) {
        console.error(error, `Failed to fetch ${status} orders`);
      }
    }
  }
}