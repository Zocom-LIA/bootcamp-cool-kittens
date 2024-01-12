import { useEffect, useState } from 'react';
import { Header } from '@zocom/page-header'
import { MenuItem } from '@zocom/menu-item'
import { DipOption } from '@zocom/dip-option'
import { ItemMenu } from '@zocom/types'
import { menuData } from '..';
import './style.scss';

export const LandingPage = () => {
    const {fetchMenu} = menuData();
    const [wontonMenu, setWontonMenu] = useState<ItemMenu[]>([])
    const [dipMenu, setDipMenu]= useState<ItemMenu[]>([])

    useEffect(() => {
        async function handleFetchWontonMenu() {
            const data = await fetchMenu("wonton")
            const wontonMenu = data.filteredMenuItems
            setWontonMenu(wontonMenu? wontonMenu: null)
        }
        async function handleFetchDipMenu() {
            const data = await fetchMenu("dip")
            const dipMenu = data.filteredMenuItems
            setDipMenu(dipMenu? dipMenu: null)
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