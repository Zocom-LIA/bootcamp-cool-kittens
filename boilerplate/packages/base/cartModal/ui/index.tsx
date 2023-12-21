import {useContext, useEffect} from "react"
import AppContext from "../../../core/context/AppContext"
import {CartItem} from '@zocom/cart-item'

type CartModalProps = {
    isOpen: boolean
    closeModal: () => void
}

export const CartModal = ({isOpen, closeModal}: CartModalProps) => {
    const {cart} = useContext(AppContext) //add setCart later

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