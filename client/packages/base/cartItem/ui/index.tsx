import {useState, useEffect, useContext} from 'react'
import { AppContext } from '@zocom/app-context'
import { CartItemProps } from '@zocom/types'
import {QtyButton} from '@zocom/qty-button'
import './style.scss';

export const CartItem = ({id, title, price, quantity} : CartItemProps) => { 
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [itemQuantity, setItemQuantity] = useState<number>(quantity)
    const {cart, setCart} = useContext(AppContext)

    useEffect(()=> {
        setTotalPrice(price * quantity)
    }, [itemQuantity, price, quantity])

    const updateQuantity = (quantity: number, operation: 'increment' | 'decrement') => {
        let updatedQuantity: number;
      
        if (operation === 'increment') {
          updatedQuantity = quantity + 1;
        } else {
          updatedQuantity = quantity - 1;
      
          if (updatedQuantity === 0) {
            setCart(cart.filter((cartItem) => cartItem.id !== id));
            return;
          }
        }
      
        setItemQuantity(updatedQuantity);
        setCart(
          cart.map((cartItem) =>
            cartItem.id === id
              ? { ...cartItem, quantity: updatedQuantity }
              : cartItem
          )
        );
      };

    return (
        <article className='cart-item__card'>
            <section className='title'>
                <h3>{title}</h3>
                <hr className='dotted-line'/>
                <h3>{totalPrice} sek</h3>
            </section>
            <section className='quantity-selection'>
                <QtyButton title='+' action={() => updateQuantity(itemQuantity, 'increment')} />
                <span>{itemQuantity} stycken</span>
                <QtyButton title='-' action={() => updateQuantity(itemQuantity, 'decrement')} />
            </section>
        </article>
    )
}