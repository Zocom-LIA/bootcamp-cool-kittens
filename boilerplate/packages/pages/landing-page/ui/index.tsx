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

    const [menu, setMenu] = useState<MenuItem[]>([])
    const {fetchMenu} = menuData();
    
    useEffect(() => {
        async function handleFetchMenu() {
            const data = await fetchMenu()
            const menu = data.menu
            setMenu(menu ? menu: null)
            console.log(menu);
            
        }
        handleFetchMenu();
    }, []);

    const sortedMenu = menu.sort((a, b) => a.id - b.id);

    return (
        <main>
            <h2>Meny</h2>
            <section>
                {sortedMenu && sortedMenu.map((menuItem) => (
                    // <MenuItem key={menuItem.id} data={menuItem}/>
                    <MenuItem key={menuItem.id} title={menuItem.title} price={menuItem.price} desc={menuItem.desc}/>
                ))}
            </section>
        </main>
    )
}