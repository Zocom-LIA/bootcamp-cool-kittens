import { CartItemProps } from '@zocom/app-context'

export const orderData = () => {
    return {
      async putOrder(orderStatus: string, cart: CartItemProps[]){
        try {

            const API_URL = 'https://s1ev3z9454.execute-api.eu-north-1.amazonaws.com/api/putOrder'
            const headers = {
                "Content-Type": "application/json",
                ...(orderStatus && {"X-Order-Status": orderStatus})
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