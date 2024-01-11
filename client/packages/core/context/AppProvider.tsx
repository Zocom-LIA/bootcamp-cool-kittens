import { useState, useEffect } from 'react'
import { AppContext } from '@zocom/app-context'

type CartItemProps = {
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

export const AppProvider = ({ children }: any) => {
  const [cart, setCart] = useState<CartItemProps[]>([])
  const [orderStatus, setOrderStatus] = useState<string>('preparing')
  const [ordersByStatus, setOrdersByStatus] = useState<{
    [orderStatus: string]: Order[]
  }>({})

  useEffect(() => {
    console.log('CART', cart)
  }, [cart])

  return (
    <AppContext.Provider
      value={{
        cart,
        setCart,
        orderStatus,
        setOrderStatus,
        ordersByStatus,
        setOrdersByStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
