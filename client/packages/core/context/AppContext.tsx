import { createContext, Dispatch, SetStateAction } from 'react'
import { CartItemProps, Order } from '@zocom/types'

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
