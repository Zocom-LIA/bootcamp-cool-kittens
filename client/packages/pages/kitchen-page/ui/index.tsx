import { useEffect, useContext } from 'react'
import { AppContext } from '@zocom/app-context'
import './style.scss'
import { Order } from '@zocom/types'
// import { filteredOrderData } from ".."
import { Header } from '@zocom/page-header'
import { KitchenStatusColumn } from '@zocom/kitchen-status-column'

type APIResponse = {
  filteredOrders: Order[]
}

export const KitchenPage = () => {
  // const {fetchFilteredOrders} = filteredOrderData();

  const statusList = ['preparing', 'ready']

  const { ordersByStatus, setOrdersByStatus } = useContext(AppContext)

  useEffect(() => {
    const fetchFilteredOrders = async (orderStatus: string) => {
      const today = new Date()
      const todaysDate = today.toISOString().split('T')[0] + ' 00:00:00'

      try {
        const BASE_URL = import.meta.env.VITE_API_BASE_URL
        const API_ENDPOINT = `/filterOrders/${orderStatus}?timeStamp=${todaysDate}`
        const API_URL = BASE_URL + API_ENDPOINT

        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `${import.meta.env.VITE_AUTH_API_KEY}`,
          },
        })
        const data: APIResponse = await response.json()
        console.log(data)

        orderStatus && orderStatus === 'ready'
          ? setOrdersByStatus((prevOrders) => ({
              ...prevOrders,
              [orderStatus]: data.filteredOrders.sort(
                (a, b) =>
                  new Date(b.timeStamp).valueOf() -
                  new Date(a.timeStamp).valueOf()
              ),
            }))
          : setOrdersByStatus((prevOrders) => ({
              ...prevOrders,
              [orderStatus]: data.filteredOrders,
            }))
      } catch (error) {
        console.error(error, `Failed to fetch ${orderStatus} orders`)
      }
    }
    statusList.forEach((orderStatus) => fetchFilteredOrders(orderStatus))
  }, [])

  return (
    <section className="kitchen-page">
      <Header />
      <main className="kitchen-wrap">
        {statusList.map((orderStatus) => (
          <KitchenStatusColumn
            orders={ordersByStatus[orderStatus]}
            status={orderStatus}
            key={orderStatus}
          />
        ))}
      </main>
    </section>
  )
}
