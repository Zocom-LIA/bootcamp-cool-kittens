import { useEffect, useState, useContext } from 'react';
import AppContext from "../../../core/context/AppContext"
import { CartModal } from '@zocom/cart-modal'
import { MenuItem } from '@zocom/menu-item'
import { DipOption } from '@zocom/dip-option'
import { menuData } from '..';
import { CartIcon } from './cartIcon'
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
    const {cart} = useContext(AppContext)
    const [cartQty, setCartQty] = useState<number>(0)
    const [cartModalOpen, setCartModalOpen] = useState<boolean>(false);
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

    // Updates the cart quantity when cart is updated
    useEffect(() => {
        if (cart) {
        let qty = 0;

        cart.forEach((item) => {
            qty += item.quantity;
        });

        setCartQty(qty);
        }
    }, [cart]);

    // const sortedMenu = menu.sort((a, b) => a.id - b.id);

    return (
        <div className='landing-page'>
            {
                cartModalOpen ? (<CartModal isOpen={cartModalOpen} closeModal = {()=> setCartModalOpen(false)}/>):(<main>
                    <div onClick={() => setCartModalOpen(true)}>
                        {CartIcon }
                    </div>
                    {
                        cartQty > 0 && (
                            <span className='cart__qty'>{cartQty}</span>
                        )
                    }
                    
                    <h2 className='menu-title'>Meny</h2>
                    <section>
                        {
                            wontonMenu && wontonMenu.map((wonton)=> (
                                <MenuItem key={wonton.id} wonton={wonton}/>
                            )) 
                        }
                    </section>
                    <section className='dip-option__card'>
                        <section className='title'>
                            <h3>Dipsås</h3>
                            <hr className='dotted-line'/>
                            <h3>19 sek</h3>
                        </section>
                        <section className='dip-options'>
                        {
                            dipMenu && dipMenu.map((dip)=> (
                                <DipOption key={dip.id} dip={dip}/>
                            ))  
                        }
                        </section>
                    </section>
                </main>
                )
            }
            </div>         
    );
}