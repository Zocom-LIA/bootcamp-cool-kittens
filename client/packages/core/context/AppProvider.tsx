import { useState, useEffect } from "react"
import { AppContext, CartItemProps, Order } from '@zocom/app-context'

export const AppProvider = ({children}: any) => {
    const [cart, setCart] = useState<CartItemProps[]>([])
    const [orderStatus, setOrderStatus] = useState<string>("preparing")
    const [ordersByStatus, setOrdersByStatus] = useState<{ [orderStatus: string]: Order[] }>({});

    useEffect(() => {
      console.log("CART", cart);
    }, [cart]);
    
    return (
        <AppContext.Provider value={{cart, setCart, orderStatus, setOrderStatus, ordersByStatus, setOrdersByStatus}}>
            {children}
        </AppContext.Provider>
    )
}