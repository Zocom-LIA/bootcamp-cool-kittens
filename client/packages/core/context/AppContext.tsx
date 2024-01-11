import { createContext, Dispatch, SetStateAction } from 'react'

export type CartItemProps = {
  id: string
  title: string
  price: number
  desc: string
  quantity: number
}

type Order = {
  orderNr: string
  orderItems: []
  orderStatus: string
  timeStamp: string
  deliveryTime: string
  totalPrice: number
}

export type AppContextType = {
  cart: CartItemProps[]
  setCart: Dispatch<SetStateAction<CartItemProps[]>>
  orderStatus: string
  setOrderStatus: Dispatch<SetStateAction<string>>
  ordersByStatus: { [orderStatus: string]: Order[] }
  setOrdersByStatus: Dispatch<
    SetStateAction<{ [orderStatus: string]: Order[] }>
  >
}

export const AppContext = createContext({} as AppContextType)
