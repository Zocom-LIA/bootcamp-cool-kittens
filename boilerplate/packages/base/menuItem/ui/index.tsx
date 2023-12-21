import { useState } from "react";
import './style.scss';

type MenuItemProps = {
    title: string,
    price: number,
    desc: string
}


export const MenuItem = ({title, price, desc} : MenuItemProps) => {  
    const [cart, setCart] = useState(false);

    const handleItemClick = () => {
        setCart(!cart);
        console.log(title);

    };


    return (
        <article
        className='menu-item__card'
        onClick={handleItemClick}
        style={{
          cursor: "pointer",
          border: cart ? "2px solid green" : "none",
        }}
      >
        <section className='title'>
          <h3>{title}</h3>
          <hr className='dotted-line'/>
          <h3>{price} sek</h3>
        </section>
        <section>
          <p>{desc}</p>
        </section>
        {cart && <p> Added to cart </p>}
      </article>
    )
}



