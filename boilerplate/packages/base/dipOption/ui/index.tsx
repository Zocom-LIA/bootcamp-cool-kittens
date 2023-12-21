import { useState } from "react";

type DipItemProps = {
    id: string,
    title: string, 
    price: number,
}

export const DipOption = ({id, title, price}: DipItemProps) => {
    const [cart, setCart] = useState(false);
    const handleDipClick = () => {
        setCart(!cart);
        console.log(title);
        
     }
    return (
        <button
      onClick={handleDipClick}
      style={{
        border: cart ? "2px solid green" : "none",
        cursor: "pointer",
      }}
    >
      {title}
     
    {cart && <p> Added to cart </p>}
    </button>
    )
}