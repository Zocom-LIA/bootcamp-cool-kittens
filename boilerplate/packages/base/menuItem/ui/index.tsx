import { useState, useEffect, useContext } from "react";
import AppContext from "../../../core/context/AppContext"

// type MenuItemProps = {
//     title: string,
//     price: number,
//     desc: string
// }

type MenuItem = {
  id: string, 
  title: string,
  desc: string,
  price: number,
  category: string
  ingredients?: [],
} 


export const MenuItem = ({wonton} : MenuItem) => {  
    const {cart, setCart} = useContext(AppContext)

    const handleAddToCart = () => {
      const itemInCart = cart.find((cartItem) => cartItem.id === wonton.id);
    
      if (itemInCart) {
        // Item is already in the cart, update the quantity
        setCart(
          cart.map((cartItem) =>
            cartItem.id === wonton.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        );
      } else {
        // Item is not in the cart, add it with quantity 1
        setCart([...cart, { ...wonton, quantity: 1 }]);
      }
    };

    //Only to see how the cart looks like in the console.
    useEffect(() => {
      console.log("CART", cart);
      
  }, [cart]);


    return (
        <article
        onClick={handleAddToCart}
        style={{
          cursor: "pointer",
          border: cart ? "2px solid green" : "none",
        }}
      >
        <section>
          <h3>{wonton.title}</h3>
          <h3>{wonton.price} sek</h3>
        </section>
        <section>
          <p>{wonton.desc}</p>
        </section>
        {cart && <p> Added to cart </p>}
      </article>
    )
}



