import { KitchenOrderCard } from '@zocom/kitchen-order-card'
import { Order } from '@zocom/types'
import './style.scss'

type StatusColumnProps = {
  status: string
  orders: Order[]
}

export const KitchenStatusColumn = ({ orders, status }: StatusColumnProps) => {
  return (
    <section className="column__wrap">
      <section className="column-title__wrap">
        <h2 className="title">{status === 'preparing' ? 'Ongoing' : 'Done'}</h2>
        <hr className="straight-line" />
      </section>
      {orders &&
        orders.map((order) => (
          <KitchenOrderCard key={order.orderNr} {...order} />
        ))}
    </section>
  )
}
