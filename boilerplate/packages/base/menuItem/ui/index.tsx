import { useState } from "react";

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
        onClick={handleItemClick}
        style={{
          cursor: "pointer",
          border: cart ? "2px solid green" : "none",
        }}
      >
        <section>
          <h3>{title}</h3>
          <h3>{price} sek</h3>
        </section>
        <section>
          <p>{desc}</p>
        </section>
        {cart && <p> Added to cart </p>}
      </article>
    )
}



