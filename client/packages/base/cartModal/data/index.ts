import { CartItemProps } from '@zocom/types'

export const orderData = () => {
    return {
      async putOrder(orderStatus: string, cart: CartItemProps[]){
        try {
            const BASE_URL = import.meta.env.VITE_API_BASE_URL
            const API_ENDPOINT = `/putOrder`
            const API_URL = BASE_URL + API_ENDPOINT

            const response = await fetch(API_URL, 
                {
                  method: 'POST',
                  headers: {
                    "Content-Type": "application/json",
                    ...(orderStatus && {"X-Order-Status": orderStatus}),
                    authorization: `${import.meta.env.VITE_AUTH_API_KEY}`
                  },
                  body: JSON.stringify(cart),
                });
          return await response.json()
        } catch (error) {
          console.log(error);
        }
      }
    }
  }