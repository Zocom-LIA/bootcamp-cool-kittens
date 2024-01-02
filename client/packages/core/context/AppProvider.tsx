import { useState } from "react"
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

    return (
        <AppContext.Provider value={{cart, setCart}}>
            {children}
        </AppContext.Provider>
    )
}