import { useContext, useEffect, useState } from "react"
import { AppContext } from '@zocom/app-context'
import { CartItem } from '@zocom/cart-item'
import { PrimaryButton } from '@zocom/primary-button'
import { motion, AnimatePresence } from "framer-motion";
import { CartIcon } from '../../../core/assets/cartIcon'
import './style.scss'

export const CartModal = () => {
    const {cart} = useContext(AppContext) //add setCart later
    const [cartQty, setCartQty] = useState<number>(0)
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [cartModalOpen, setCartModalOpen] = useState<boolean>(false);

    //Close modal when pressing Esc on desktop
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
            setCartModalOpen(false)
            }
        };

        if (cartModalOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [cartModalOpen]);

    //Calculate total price for cart items. Updates whenever cart is updated
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

    const handleSendOrder = () => {
        console.log("Pay button");
        
    }

    return (
        <main>
            <div className="cart__icon" onClick={()=>setCartModalOpen(!cartModalOpen)}>
                {CartIcon}
            </div>
            {
                cartQty > 0 && (
                    <span className='cart__qty'>{cartQty}</span>
                )
            }

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
                        duration: 0.5,
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
                        <PrimaryButton title="Take my money!" disabled={cart.length < 1} action={handleSendOrder}/>  
                    </motion.main>
                )}
            </AnimatePresence>
        </main>
    )
}