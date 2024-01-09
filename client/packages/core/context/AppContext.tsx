import {createContext, Dispatch, SetStateAction } from "react"

export type CartItemProps = {
    id: string, 
    title: string, 
    price: number,
    desc: string,
    quantity: number
}

export type AppContextType = {
    cart: CartItemProps[]
    setCart: Dispatch<SetStateAction<CartItemProps[]>>;
    orderStatus: string;
    setOrderStatus: Dispatch<SetStateAction<string>>;
}

export const AppContext = createContext({} as AppContextType)