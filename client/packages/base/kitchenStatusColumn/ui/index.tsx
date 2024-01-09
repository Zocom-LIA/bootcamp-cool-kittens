import { KitchenOrderCard } from "@zocom/kitchen-order-card";
import './style.scss';

// type StatusArrays = {
//     statusArrays: StatusArray
// }

// type StatusArray = {
//     [orderstatus: string]: Order[]
// }

type Order = {
    orderNr: string;
    orderItems: [];
    orderStatus: string;
    timeStamp: string;
    deliveryTime: string;
    totalPrice: number;
}

type StatusColumnProps = {
    name: string;
    orders: Order[];
}

export const KitchenStatusColumn = ({orders, name}: StatusColumnProps) => {

    console.log(orders);
    
    return (
       <section>
            <p>{name}</p>
            {orders.map((order) => (
                <KitchenOrderCard 
                orderNr={order.orderNr}
                orderItems={order.orderItems}
                totalPrice={order.totalPrice}
                orderStatus={order.orderStatus}
                timeStamp={order.timeStamp}
                deliveryTime={order.deliveryTime}
                // key={order.orderNr} {...order}
                // buttonAction={() => updateOrderStatus(order.orderNr)}
                />
            ))}
       </section>
    )
  }