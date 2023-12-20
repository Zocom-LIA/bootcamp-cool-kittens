export const menuData = () => {
  return {
    async fetchMenu (): Promise<any> { // vilken type ska det vara. 
      try {
        const URL = "https://s1ev3z9454.execute-api.eu-north-1.amazonaws.com/api/menu"
        const response = await fetch(URL)
        return await response.json()
      } catch (error) {
        console.error(error);
      }
    }
  }
}


