import React from 'react';
// import './style.scss';

interface MenuItem {
    title: string,
    desc: string,
    price: number,
    category: string
    ingredients?: [],
} 

export const MenuItem = () => {
    return (
        <article>
            <section>
                <h3>title</h3>
                <hr className='dotted'/>
                <h3>price</h3>
            </section>
            <section>
                <p>desc</p>
            </section>
        </article>
    )
}



