export const orderData = () => {
  return {
    async fetchOrder(orderNr: string){
      try {
        const BASE_URL = import.meta.env.VITE_API_BASE_URL
        const API_ENDPOINT = `/order/${orderNr}`
        const API_URL = BASE_URL + API_ENDPOINT
        
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            authorization: `${import.meta.env.VITE_AUTH_API_KEY}`
          }
          })
        return await response.json()
      } catch (error) {
        console.log(error);
      }
    }
  }
}