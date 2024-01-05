import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from '@zocom/app-context'
import { CartItem } from '@zocom/cart-item'
import { PrimaryButton } from '@zocom/primary-button'
import { motion, AnimatePresence } from "framer-motion";
import { CartIcon } from '../../../core/assets/cartIcon'
import './style.scss'

export const CartModal = () => {
    const {cart, setCart, orderStatus} = useContext(AppContext)
    const [cartQty, setCartQty] = useState<number>(0)
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [cartModalOpen, setCartModalOpen] = useState<boolean>(false);
    const navigate = useNavigate()

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

    const API_URL = 'https://s1ev3z9454.execute-api.eu-north-1.amazonaws.com/api/putOrder' //samla API i en annan fil och importera.

    const handleSendOrder = async () => { //bryta ut till en data fil

        const headers = {
            "Content-Type": "application/json",
            ...(orderStatus && {"X-Order-Status": orderStatus})
        }

        const response = await fetch(API_URL, 
            {
                method: 'POST',
                body: JSON.stringify(cart),
                headers: headers 
            });
        
        const data = await response.json()
        console.log("Data",data.orderNr);
        
        setCart([])
        navigate(`/order/${data.orderNr}`)
    }

    return (
        <main>
            <div className="cart__icon" onClick={()=>setCartModalOpen(!cartModalOpen)}>
                {CartIcon}
                {
                    !cartModalOpen && (
                        cartQty > 0 && (
                            <motion.span 
                            initial={{ scale: 1 }}
                            animate={{ scale: 1.1 }}
                            className='cart__qty'
                            >{cartQty}</motion.span>
                        )
                    )
                }
            </div>


            <AnimatePresence>
                {cartModalOpen && (
                    <motion.main             
                    className="cart__modal"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "100vh", opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      transition: {
                        ease: "easeInOut",
                        duration: 0.6,
                      },
                    }}>
                        {
                        cart.length > 0 ? 
                        (<section className='cart-item__container'>
                            {cart.map((cartItem)=> (
                                <CartItem key={cartItem.id} id={cartItem.id} title={cartItem.title} price={cartItem.price} quantity={cartItem.quantity}/> //Skulle kunna skicka en hel cartItem istället
                            ))}
                        </section>)
                        :(<section className='cart-empty__notif'>Your cart is empty</section>)
                        }
                        <section className='summary-wrap'>
                            <article className='price-summary__card'>
                                <section>
                                    <h3 className='title'>Totalt</h3>
                                    <p className='tax'>inkl 20% moms</p>
                                </section>
                                <h3 className='price-total'>{totalPrice} Sek</h3>
                            </article>
                            <PrimaryButton 
                            title="Take my money!" 
                            className="black-bg"
                            disabled={cart.length < 1} 
                            action={handleSendOrder}/>  
                        </section>
                    </motion.main>
                )}
            </AnimatePresence>
        </main>
    )
}