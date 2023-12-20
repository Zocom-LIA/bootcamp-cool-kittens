import './style.scss';

/* Import dependencies */
import { useEffect, useState } from 'react';
import { MenuItem } from '@zocom/menu-item'
import { menuData } from '..';

type MenuItem = {
    id: string, 
    title: string,
    desc: string,
    price: number,
    category: string
    ingredients?: [],
} 

export const LandingPage = () => {

    const [wontonMenu, setWontonMenu] = useState<MenuItem[]>([])
    const [dipMenu, setDipMenu]= useState<MenuItem[]>([])
    const {fetchMenu} = menuData();

    useEffect(() => {
        async function handleFetchWontonMenu() {
            const data = await fetchMenu("wonton")
            const wontonMenu = data.filteredMenuItems
            setWontonMenu(wontonMenu? wontonMenu: null)
            console.log("Wonton", wontonMenu)
        }
        async function handleFetchDipMenu() {
            const data = await fetchMenu("dip")
            const dipMenu = data.filteredMenuItems
            setDipMenu(dipMenu? dipMenu: null)
            console.log("Dip", dipMenu)
        }
        handleFetchWontonMenu();
        handleFetchDipMenu();
    }, []);

    // const sortedMenu = menu.sort((a, b) => a.id - b.id);

    return (
        <main>
          <h2>Meny</h2>
          <section>
            {
                wontonMenu && wontonMenu.map((wonton)=> (
                    <MenuItem key={wonton.id} title={wonton.title} price={wonton.price} desc={wonton.desc}/>
                )) 
            }
          </section>
          <section>
            {
                dipMenu && dipMenu.map((dip)=> (
                    <MenuItem key={dip.id} title={dip.title} price={dip.price} desc={dip.desc}/>
                ))  
            }
          </section>
        </main>
      );
}