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

export const AppContext = createContext({} as AppContextType)