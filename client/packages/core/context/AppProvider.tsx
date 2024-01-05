import { useState, useEffect } from "react"
import { AppContext }from '@zocom/app-context'


type CartItemProps = {
    id: string, 
    title: string, 
    price: number,
    desc: string,
    quantity: number
}

export const AppProvider = ({children}: any) => {
    const [cart, setCart] = useState<CartItemProps[]>([])
    const [orderStatus, setOrderStatus] = useState<string>("preparing")

    useEffect(() => {
      console.log("CART", cart);
    }, [cart]);
    
    return (
        <AppContext.Provider value={{cart, setCart, orderStatus, setOrderStatus}}>
            {children}
        </AppContext.Provider>
    )
}