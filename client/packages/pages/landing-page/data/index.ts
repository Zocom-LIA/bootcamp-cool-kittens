// Fix type on promise
// import dotenv from "dotenv";
// dotenv.config();

export const menuData = () => {
  return {
    async fetchMenu(category: string){
      try {
        console.log(import.meta.env.VITE_AUTH_API_KEY);
        // console.log(process.env.VITE_AUTH_API_KEY);
             
        // const API_ENDPOINT = `/menu/${category}`
        // const baseUrl = import.meta.env.VITE_BASE_API_URL
        // const URL = baseUrl + API_ENDPOINT
        const URL = `https://s1ev3z9454.execute-api.eu-north-1.amazonaws.com/api/menu/${category}`;
        const response = await fetch(URL, {
          method: "GET",
          headers: {
            authorization: "DiIA4SPIxA80wwwYYsrwh2dtYL79LIJD7StpF08a"
          }
        })
        return await response.json()
      } catch (error) {
        console.log(error);
      }
    }
  }
}




