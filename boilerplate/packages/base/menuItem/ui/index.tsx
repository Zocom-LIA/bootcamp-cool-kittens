import React from 'react';
// import './style.scss';

interface MenuItem {
    id: string, 
    title: string,
    desc: string,
    price: number,
    category: string
    ingredients?: [],
} 

interface MenuItemProps {
    data: MenuItem
}

export const MenuItem = ({data}:MenuItemProps) => {
    
    return (
        <article>
            <section>
                <h3>{data.title}</h3>
                {/* <hr className='dotted'/> */}
                <h3>{data.price}</h3>
            </section>
            <section>
                <p>{data.desc}</p>
            </section>
        </article>
    )
}



