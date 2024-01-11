import { CartItemProps } from '@zocom/app-context'

export const orderData = () => {
    return {
      async putOrder(orderStatus: string, cart: CartItemProps[]){
        try {
            const BASE_URL = import.meta.env.VITE_API_BASE_URL
            const API_ENDPOINT = `/putOrder`
            const API_URL = BASE_URL + API_ENDPOINT
             const headers = {
                "Content-Type": "application/json",
                ...(orderStatus && {"X-Order-Status": orderStatus}),
                authorization: `${import.meta.env.VITE_AUTH_API_KEY}`
            } 
    
            const response = await fetch(API_URL, 
                {
                    method: 'POST',
                    body: JSON.stringify(cart),
                    headers: headers
                });
          return await response.json()
        } catch (error) {
          console.log(error);
        }
      }
    }
  }