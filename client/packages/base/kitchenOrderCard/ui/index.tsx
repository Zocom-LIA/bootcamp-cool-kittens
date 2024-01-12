import { useContext, useState, useEffect } from 'react'
import { AppContext } from '@zocom/app-context'
import { PrimaryButton } from '@zocom/primary-button'
import { differenceInSeconds, format } from 'date-fns'
import './style.scss'

type CardProps = {
  orderNr: string
  orderItems: OrderItem[]
  orderStatus: string
  timeStamp: string
  deliveryTime: string
  totalPrice: number
  timeCooked: string
}

type OrderItem = {
  title: string
  quantity: number
  price: number
}

export const KitchenOrderCard = ({
  orderNr,
  orderItems,
  orderStatus,
  totalPrice,
  timeStamp,
  timeCooked,
}: CardProps) => {
  const { setOrdersByStatus } = useContext(AppContext)
  const [waitingTime, setWaitingTime] = useState<string>('')

  const calcTimeCooked = () => {
    const timeDifference = differenceInSeconds(new Date(), new Date(timeStamp))
    const timeCooked = format(new Date(timeDifference * 1000), 'mm:ss')
    return timeCooked
  }

  const updateOrder = async (orderNr: string) => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL
    const API_ENDPOINT = `/updateOrder`
    const API_URL = BASE_URL + API_ENDPOINT

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `${import.meta.env.VITE_AUTH_API_KEY}`,
        },
        body: JSON.stringify({
          orderNr: orderNr,
          orderStatus: 'ready',
          timeCooked: calcTimeCooked(),
        }),
      })

      const data = await response.json()
      const updatedOrder = data?.order
      console.log(updatedOrder)

      setOrdersByStatus((prevOrders) => {
        const preparingOrders = prevOrders['preparing'].filter(
          (order) => order.orderNr !== orderNr
        )
        const doneOrders = [...prevOrders['ready'], updatedOrder]

        return {
          ...prevOrders,
          preparing: preparingOrders,
          ready: doneOrders.sort(
            (a, b) =>
              new Date(b.timeStamp).valueOf() - new Date(a.timeStamp).valueOf()
          ),
        }
      })
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  useEffect(() => {
    const orderTimestamp = new Date(timeStamp)

    const calculateWaitingTime = (): number => {
      return differenceInSeconds(new Date(), orderTimestamp)
    }

    const formatWaitingTime = (waitingTimeInSeconds: number): string => {
      const formattedTime = format(
        new Date(waitingTimeInSeconds * 1000),
        'mm:ss'
      )
      return formattedTime
    }

    const initialWaitingTimeInSeconds = calculateWaitingTime()
    setWaitingTime(formatWaitingTime(initialWaitingTimeInSeconds))

    const intervalId = setInterval(() => {
      const newWaitingTimeInSeconds = calculateWaitingTime()
      setWaitingTime(formatWaitingTime(newWaitingTimeInSeconds))
    }, 1000)

    return () => clearInterval(intervalId)
  }, [timeStamp, waitingTime])

  return (
    <article
      className={`kitchen-order__card ${
        orderStatus === 'preparing' ? 'red-card' : 'green-card'
      }`}
    >
      <h2 className="order-number">#{orderNr}</h2>
      <section className="order-contents__container">
        {orderItems &&
          orderItems.map((item, index) => (
            <section key={index} className="order-item__wrap">
              <section className="title-qty__wrap">
                <h3 className="item-name">{item.title}</h3>
                <hr className="dotted-line" />
                <h3>{item.quantity} st</h3>
              </section>
              <h3 className="item-total">{item.price * item.quantity} sek</h3>
            </section>
          ))}
      </section>
      <p className="order-total">{totalPrice} sek</p>
      {orderStatus === 'preparing' ? (
        <p className="wait-timer">Väntat i {waitingTime}</p>
      ) : (
        <p className="wait-timer">Tillagningstid {timeCooked}</p>
      )}
      <PrimaryButton
        title={orderStatus === 'preparing' ? 'Redo att serveras' : 'Serverad'}
        className={orderStatus === 'preparing' ? 'red-bg' : 'green-bg'}
        disabled={orderStatus === 'ready'}
        action={() => updateOrder(orderNr)}
      />
    </article>
  )
}
