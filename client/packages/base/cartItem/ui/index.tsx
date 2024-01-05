import {useState, useEffect, useContext} from 'react'
import { AppContext } from '@zocom/app-context'
import {QtyButton} from '@zocom/qty-button'
import './style.scss';

type CartItemProps = {
    id: string
    title: string
    price: number
    quantity: number
}

export const CartItem = ({id, title, price, quantity} : CartItemProps) => {  
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [itemQuantity, setItemQuantity] = useState(quantity)
    const {cart, setCart} = useContext(AppContext)

    const calcTotalPrice = (price:number, quantity:number) => {
        setTotalPrice(price * quantity)
    }

    //Update totalprice when the item quantity changes
    useEffect(()=> {
        calcTotalPrice(price, itemQuantity)
    }, [itemQuantity])

    const incrementQty = (quantity:number) => {
        const updatedQuantity = quantity += 1
        
        setItemQuantity(updatedQuantity)
        setCart(
            cart.map((cartItem) =>
                cartItem.id === id
                ? { ...cartItem, quantity: updatedQuantity}
                : cartItem
            )
        );
    }

    const decrementQty = (quantity:number) => {
        const updatedQuantity = quantity -= 1
        
        if (updatedQuantity === 0) {
            setCart(cart.filter((cartItem) => cartItem.id !== id))
        } else {
            setItemQuantity(updatedQuantity)
            setCart(
                cart.map((cartItem) =>
                  cartItem.id === id
                    ? { ...cartItem, quantity: updatedQuantity}
                    : cartItem
                )
            );
        }
    }

    return (
        <article className='cart-item__card'>
            <section className='title'>
                <h3>{title}</h3>
                <hr className='dotted-line'/>
                <h3>{totalPrice} sek</h3>
            </section>
            <section className='quantity-selection'>
                <QtyButton title='+' action={() => incrementQty(itemQuantity)}/>
                <span>{itemQuantity} stycken</span>
                <QtyButton title='-' action={() => decrementQty(itemQuantity)}/>
            </section>
        </article>
    )
}