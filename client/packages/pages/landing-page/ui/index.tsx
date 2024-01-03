import { useEffect, useState } from 'react';
import { Header } from '@zocom/page-header'
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
    const {fetchMenu} = menuData();
    const [wontonMenu, setWontonMenu] = useState<MenuItem[]>([])
    const [dipMenu, setDipMenu]= useState<MenuItem[]>([])

    //Fetch and set menu filtered by category on mount
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

    return (
        <div className='landing-page'>
            <Header/>
            <main className='menu-wrap'>                    
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
        </div>
    );
}