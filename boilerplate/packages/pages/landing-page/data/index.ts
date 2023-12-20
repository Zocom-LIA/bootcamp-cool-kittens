// Fixa typescript

export const menuData = () => {
  return {
    async fetchMenu(category: string) {
      try {
        const URL = `https://s1ev3z9454.execute-api.eu-north-1.amazonaws.com/api/menu/${category}`;
        const response = await fetch(URL)
        return await response.json()
      } catch (error) {
        console.log(error);
        
      }
    }
  }
};

// export const menuData = () => {
//   const categories = ["wonton", "dip"];
  
//   return {
//     async fetchMenu(): Promise<any> {
//       try {
//         const filteredMenuItems = [];

//         await Promise.all(
//           categories.map(async (category) => {
//             const categoryData = {
//               category: "",
//               items: []
//             }
//             const URL = `https://s1ev3z9454.execute-api.eu-north-1.amazonaws.com/api/menu/${category}`;
//             const response = await fetch(URL);
//             const filteredData = await response.json();
//             categoryData.category = category
//             categoryData.items = filteredData

//             filteredMenuItems.push(categoryData);
//           })
//         );
//         return filteredMenuItems;
//       } catch (error) {
//         console.error(error);
//       }
//     },
//   };
// };




