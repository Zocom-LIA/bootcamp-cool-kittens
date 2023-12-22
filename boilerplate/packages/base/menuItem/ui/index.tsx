import { useEffect, useContext } from "react";
import AppContext from "../../../core/context/AppContext"
import { useState } from "react";
import './style.scss';

type MenuItem = {
  id: string, 
  title: string,
  desc: string,
  price: number,
  category: string
  ingredients?: [],
} 

type WontonItemProps = {
  wonton: MenuItem
}


export const MenuItem = ({wonton} : WontonItemProps) => {  
    const {cart, setCart} = useContext(AppContext)

    const handleAddToCart = () => {
      const itemInCart = cart.find((cartItem) => cartItem.id === wonton.id);
    
      if (itemInCart) {
        // Item is already in cart, update its quantity
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
        className='menu-item__card'
        onClick={handleAddToCart}
        style={{
          cursor: "pointer",
          // border: cart ? "2px solid green" : "none",
        }}
      >
        <section>
          <h3>{wonton.title}</h3>
          <h3>{wonton.price} sek</h3>
        </section>
        <section>
          {wonton.ingredients?.map((ingredient) => (
            <p>{ingredient}</p>       
          ))}
        <section className='title'>
          <h3>{title}</h3>
          <hr className='dotted-line'/>
          <h3>{price} sek</h3>
        </section>
        <section>
          <p className='ingredients'>{desc}</p>
        </section>
      </article>
    )
}



