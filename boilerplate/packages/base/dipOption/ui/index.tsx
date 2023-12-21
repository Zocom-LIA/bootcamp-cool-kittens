import { useEffect, useContext } from "react";
import AppContext from "../../../core/context/AppContext"

// type DipItemProps = {
//     id: string,
//     title: string, 
//     price: number,
// }

type MenuItem = {
  id: string, 
  title: string,
  desc: string,
  price: number,
  category: string
  ingredients?: [],
} 

export const DipOption = ({dip}: MenuItem) => {
  const {cart, setCart} = useContext(AppContext)

  const handleAddToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem.id === dip.id);
    
    if (itemInCart) {
      // Item is already in the cart, update the quantity
      setCart(
        cart.map((cartItem) =>
          cartItem.id === dip.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      // Item is not in the cart, add it with quantity 1
      setCart([...cart, { ...dip, quantity: 1 }]);
    }
  }

  //Only to see how the cart looks like in the console.
  useEffect(() => {
    console.log("CART", cart);
    
}, [cart]);

    return (
        <button
      onClick={handleAddToCart}
      style={{
        border: cart ? "2px solid green" : "none",
        cursor: "pointer",
      }}
    >
      {dip.title}
     
    {cart && <p> Added to cart </p>}
    </button>
    )
}