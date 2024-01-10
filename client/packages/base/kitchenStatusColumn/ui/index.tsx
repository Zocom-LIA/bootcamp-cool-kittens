import { KitchenOrderCard } from "@zocom/kitchen-order-card";
import './style.scss';

type Order = {
    orderNr: string;
    orderItems: [];
    orderStatus: string;
    timeStamp: string;
    deliveryTime: string;
    totalPrice: number;
}

type StatusColumnProps = {
    status: string;
    orders: Order[];
}

export const KitchenStatusColumn = ({orders, status}: StatusColumnProps) => {    
    return (
       <section className='column__wrap'>
        <section className='column-title__wrap'>
            <h2 className='title'>{status === 'preparing' ? 'Ongoing' : 'Done'}</h2>
            <hr className='straight-line' />
        </section>
            {orders && orders.map((order) => (
                <KitchenOrderCard 
                orderNr={order.orderNr}
                orderItems={order.orderItems}
                totalPrice={order.totalPrice}
                orderStatus={order.orderStatus}
                timeStamp={order.timeStamp}
                deliveryTime={order.deliveryTime}
                // key={order.orderNr} {...order}
                />
            ))}
       </section>
    )
  }