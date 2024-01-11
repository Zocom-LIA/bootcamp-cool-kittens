import { useContext } from "react";
import { AppContext } from "@zocom/app-context";
import { ItemMenu } from '@zocom/types'
import './style.scss';

type WontonItemProps = {
  wonton: ItemMenu
}

export const MenuItem = ({wonton} : WontonItemProps) => {  
    const {cart, setCart} = useContext(AppContext)

    const handleAddToCart = () => {
      const itemInCart = cart.find((cartItem) => cartItem.id === wonton.id);
    
      if (itemInCart) {
        setCart(
          cart.map((cartItem) =>
            cartItem.id === wonton.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        );
      } else {
        setCart([...cart, { ...wonton, quantity: 1 }]);
      }
    };

  //The ingredients are transformed to a single string separated by commas. 
  const joinedIngredients = wonton.ingredients? wonton.ingredients.join(', '): null;

    return (
        <article
        className='menu-item__card'
        onClick={handleAddToCart}
      >
        <section className='title'>
          <h3>{wonton.title}</h3>
          <hr className='dotted-line'/>
          <h3>{wonton.price} sek</h3>
        </section>
        <section className='ingredients'>
          {joinedIngredients}
        </section>
      </article>
    )
}



