import {useContext, useEffect, useState} from "react"
import AppContext from "../../../core/context/AppContext"
import {CartItem} from '@zocom/cart-item'

type CartModalProps = {
    isOpen: boolean
    closeModal: () => void
}

export const CartModal = ({isOpen, closeModal}: CartModalProps) => {
    const {cart} = useContext(AppContext) //add setCart later
    const [totalPrice, setTotalPrice] = useState<number>(0)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
            closeModal();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, closeModal]);

    const calcTotalPrice = () => {
        let price = 0
        cart.forEach((cartItem) => {
            price += cartItem.price * cartItem.quantity
        })
        setTotalPrice(price)
    }

    useEffect(()=> {
        calcTotalPrice()
    }, [cart])

    return (
        <>
            {isOpen && (
                <main>
                {/* <main onClick={closeModal}></main> */}
                    {
                        cart.length > 0 ? 
                        (<section>
                            {cart.map((cartItem)=> (
                                <CartItem key={cartItem.id} id={cartItem.id} title={cartItem.title} price={cartItem.price} quantity={cartItem.quantity}/>
                            ))}
                        </section>)
                        :(<section>Your cart is empty</section>)
                    }
                    <section>Total price: {totalPrice}</section>
                </main>
            )}
        </>
    )
}