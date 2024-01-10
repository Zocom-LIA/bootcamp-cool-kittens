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
    title: string;
    orders: Order[];
}

export const KitchenStatusColumn = ({orders, title}: StatusColumnProps) => {    
    return (
       <section>
            <p>{title}</p>
            {orders && orders.map((order) => (
                <KitchenOrderCard 
                key={order.orderNr} {...order}
                />
            ))}
       </section>
    )
  }