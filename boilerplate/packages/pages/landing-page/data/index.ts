// Fix type on promise

export const menuData = () => {
  return {
    async fetchMenu(category: string){
      try {
        const URL = `https://s1ev3z9454.execute-api.eu-north-1.amazonaws.com/api/menu/${category}`;
        const response = await fetch(URL)
        return await response.json()
      } catch (error) {
        console.log(error);
      }
    }
  }
}




