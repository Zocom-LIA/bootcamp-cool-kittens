export const orderData = () => {
    return {
      async fetchOrder(orderNr: string){
        try {
          const URL = `https://s1ev3z9454.execute-api.eu-north-1.amazonaws.com/api/order/${orderNr}`;
          const response = await fetch(URL)
          return await response.json()
        } catch (error) {
          console.log(error);
        }
      }
    }
  }