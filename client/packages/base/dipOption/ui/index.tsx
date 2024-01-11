import { useContext } from "react";
import { motion } from "framer-motion";
import { AppContext } from "@zocom/app-context";
import './style.scss';

type MenuItem = {
  id: string, 
  title: string,
  desc: string,
  price: number,
  category: string
  ingredients?: [],
} 

type DipItemProps = {
  dip: MenuItem
}

export const DipOption = ({dip}: DipItemProps) => {
  const {cart, setCart} = useContext(AppContext)

  const handleAddToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem.id === dip.id);
    
    if (itemInCart) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === dip.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...dip, quantity: 1 }]);
    }
  }

  return (
    <motion.button
    whileHover={{backgroundColor: "#353131"}}
    whileTap={{scale: 0.95}}
    className='dip-option__button'
    onClick={handleAddToCart}
    >
      {dip.title}
    </motion.button>
  )
}