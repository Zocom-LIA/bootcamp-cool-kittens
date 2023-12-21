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

    const [cartModalOpen, setCartModalOpen] = useState(false);
    return (
        <main>
            <button onClick={() => setCartModalOpen(true)}>CART</button> {/*Detta ska vara en ikon sen inte en button :)*/}
            <CartModal isOpen={cartModalOpen} closeModal = {()=> setCartModalOpen(false)}/>
            <h2>Meny</h2>
            <section>
                {
                    wontonMenu && wontonMenu.map((wonton)=> (
                        <MenuItem key={wonton.id} title={wonton.title} price={wonton.price} desc={wonton.desc}/>
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
                        <DipOption key={dip.id} id={dip.id} title={dip.title} price={dip.price}/>
                    ))  
                }
            </section>
        </main>
    );
}