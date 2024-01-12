import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '@zocom/app-context'
import { CartItem } from '@zocom/cart-item'
import { PrimaryButton } from '@zocom/primary-button'
import { motion, AnimatePresence } from 'framer-motion';
import { CartIcon } from '../../../core/assets/cartIcon' //could we change the path?
import { orderData } from '..'
import './style.scss'

export const CartModal = () => {
    const {cart, setCart, orderStatus} = useContext(AppContext)
    const [cartQty, setCartQty] = useState<number>(0)
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [cartModalOpen, setCartModalOpen] = useState<boolean>(false);
    const { putOrder } = orderData();
    const navigate = useNavigate()


    useEffect(() => {
        const calcTotalPrice = () => {
            let price = 0
            cart.forEach((cartItem) => {
                price += cartItem.price * cartItem.quantity
            })
            setTotalPrice(price)
        }

        if (cart) {
            let qty = 0;
    
            cart.forEach((item) => {
                qty += item.quantity;
            });
    
            setCartQty(qty);
            calcTotalPrice();
        }
    }, [cart]);
    
    const handleSendOrder = async () => {
        const data = await putOrder(orderStatus, cart)
        const orderNr = data.orderNr
        console.log("OrderNr", data.orderNr);
        
        setCart([])
        navigate(`/order/${orderNr}`)
    }

    return (
        <main>
            <div className="cart__icon" onClick={()=>setCartModalOpen(!cartModalOpen)}>
                {CartIcon}
                {
                    !cartModalOpen && (
                        cartQty > 0 && (
                            <span className='cart__qty'>{cartQty}</span>
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
                                <CartItem key={cartItem.id} {...cartItem} />
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