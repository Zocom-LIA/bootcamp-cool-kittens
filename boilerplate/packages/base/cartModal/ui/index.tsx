import React, {useContext, useEffect} from "react"
import AppContext from "../../../core/context/AppContext"
import {CartItem} from '@zocom/cart-item'

export const CartModal = ({isOpen, closeModal}) => {
    const {cart, setCart} = useContext(AppContext)

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

    return (
        <>
            {isOpen && (
                <main>
                    {
                        cart.length > 0 ? 
                        (<section>
                            {cart.map((cartItem)=> (
                                <CartItem title={cartItem.title} price={cartItem.price}/>
                            ))}
                        </section>)
                        :(<section>Your cart is empty</section>)
                    }
                    <section>TOTAL PRICE</section>
                </main>
            )}
        </>
    )
}