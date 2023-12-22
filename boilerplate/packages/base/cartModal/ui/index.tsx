import { useContext, useEffect, useState } from "react"
import AppContext from "../../../core/context/AppContext"
import { CartItem } from '@zocom/cart-item'
import { PrimaryButton } from '@zocom/primary-button'
import { motion, AnimatePresence } from "framer-motion";
import './style.scss'
import { CartIcon } from '../../../pages/landing-page/ui/cartIcon'

// type CartModalProps = {
//     isOpen: boolean
//     closeModal: () => void
// }

// export const CartModal = ({isOpen, closeModal}: CartModalProps) => {
export const CartModal = () => {
    const {cart} = useContext(AppContext) //add setCart later
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [cartQty, setCartQty] = useState<number>(0)
    const [cartModalOpen, setCartModalOpen] = useState<boolean>(false);


    // useEffect(() => {
    //     const handleKeyDown = (e: KeyboardEvent) => {
    //         if (e.key === "Escape") {
    //         closeModal();
    //         }
    //     };

    //     if (isOpen) {
    //         window.addEventListener("keydown", handleKeyDown);
    //     }

    //     return () => window.removeEventListener("keydown", handleKeyDown);
    // }, [isOpen, closeModal]);

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

    // Updates the cart quantity when cart is updated
    useEffect(() => {
        if (cart) {
        let qty = 0;

        cart.forEach((item) => {
            qty += item.quantity;
        });

        setCartQty(qty);
        }
    }, [cart]);

    return (
        <main>
            <div className="cart__icon" onClick={()=>setCartModalOpen(!cartModalOpen)}>
                {CartIcon}
                {
                    cartQty > 0 && (
                        <span className='cart__qty'>{cartQty}</span>
                    )
                }
            </div>

            <AnimatePresence>
                {cartModalOpen && (
                    <motion.main             
                    className="cart__container"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "100vh", opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      transition: {
                        ease: "easeInOut",
                        duration: 0.3,
                        delay: 1.2,
                      },
                    }}>
                        {
                        cart.length > 0 ? 
                        (<section>
                            {cart.map((cartItem)=> (
                                <CartItem key={cartItem.id} id={cartItem.id} title={cartItem.title} price={cartItem.price} quantity={cartItem.quantity}/> //Skulle kunna skicka en hel cartItem istället
                            ))}
                        </section>)
                        :(<section>Your cart is empty</section>)
                        }
                        <section>Total price: {totalPrice}</section>
                        {/*Need to add an action to primary button -> send order*/}
                        <PrimaryButton title="Take my money!" disabled={cart.length < 1}/>  
                    </motion.main>
                )}
            </AnimatePresence>
        </main>
    )
}