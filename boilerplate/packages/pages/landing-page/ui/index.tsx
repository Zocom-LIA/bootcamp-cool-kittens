import { useEffect, useState } from 'react';
import { CartModal } from '@zocom/cart-modal'
import { MenuItem } from '@zocom/menu-item'
import { DipOption } from '@zocom/dip-option'
import { menuData } from '..';
import './style.scss';

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

    //Fetch and set menu filtered by category
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
        <div className='landing-page'>
            <header>
                <CartModal />
            </header>
            <main>                    
                <h2>Meny</h2>
                <section>
                    {
                        wontonMenu && wontonMenu.map((wonton)=> (
                            <MenuItem key={wonton.id} wonton={wonton}/>
                        )) 
                    }
                </section>
                <section>
                    <section>
                        <h3>Dipsås</h3>
                        {/* <hr/> */}
                        <h3>19 sek</h3>
                    </section>
                    {
                        dipMenu && dipMenu.map((dip)=> (
                            <DipOption key={dip.id} dip={dip}/>
                        ))  
                    }
                </section>
            </main>
        </div>
    );
}