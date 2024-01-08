import './style.scss';

type OrderItem = {
  title: string;
  quantity: number;
  price: number;
}

type OrderItemsProps = {
  orderItems: OrderItem[]
}

export const KitchenOrderItem = ({orderItems}: OrderItemsProps) => {
  return (
      <article className='kitchen-order__item'>
        {
          orderItems && orderItems.map((item, index) => (
            <section key={index} className='title'>
              <h3>{item.title}</h3>
              <hr className='dotted-line'/>
              <h3>Quantity: {item.quantity}</h3>
              <h3>Total: {item.price * item.quantity} sek</h3>
            </section>
          ))
        }
      </article>

  )
}

