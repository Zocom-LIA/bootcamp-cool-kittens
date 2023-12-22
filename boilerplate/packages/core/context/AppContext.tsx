
import {createContext, Dispatch, SetStateAction } from "react"

type CartItemProps = {
    id: string, 
    title: string, 
    price: number,
    desc: string,
    quantity: number
}

type AppContextType = {
    cart: CartItemProps[]
    setCart: Dispatch<SetStateAction<CartItemProps[]>>;
}

const AppContext = createContext({} as AppContextType)

export default AppContext