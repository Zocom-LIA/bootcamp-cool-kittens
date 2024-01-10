import { PrimaryButton } from '@zocom/primary-button';
import './style.scss';

import { useContext } from 'react';
import { AppContext } from '@zocom/app-context';

type CardProps = {
    orderNr: string;
    orderItems: OrderItem[];
    orderStatus: string;
    timeStamp: string;
    deliveryTime: string;
    totalPrice: number;
}

type OrderItem = {
    title: string;
    quantity: number;
    price: number;
}
  
export const KitchenOrderCard = ({ orderNr, orderItems, orderStatus }: CardProps) => {
  
  const { setOrdersByStatus} = useContext(AppContext);

  const updateOrderStatus = async (orderNr: string) => {
    const API_URL = "https://s1ev3z9454.execute-api.eu-north-1.amazonaws.com/api/updateOrderStatus"
    const response = await fetch(API_URL,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderNr: orderNr,
        orderStatus: "ready",
      }),
    })

    await response.json()
    setOrdersByStatus((prevOrders) => {
      const updatedOrders = prevOrders["preparing"].filter((order) => order.orderNr !== orderNr);
      return {
        ...prevOrders,
        preparing: updatedOrders,
        ready: [...prevOrders["ready"], ...updatedOrders], // Move the order to the "ready" status
      };
    });
  }
  
  return (
     <article>
        <h2>{orderNr}</h2>
         {
          orderItems && orderItems.map((item, index) => (
            <section key={index} className='title'>
              <h3>{item.title}</h3>
              <hr className='dotted-line'/>
              <h3>{item.quantity} st</h3>
              <h3>{item.price * item.quantity} sek</h3>
            </section>
          ))
        }
        <PrimaryButton 
        title={orderStatus === "preparing" ? "Redo att serveras" : "Serverad"} 
        className={orderStatus === "preparing" ? "red-bg" : "green-bg"} 
        disabled={orderStatus === "ready"}
        action={() => updateOrderStatus(orderNr)}
        />
     </article>
  )
}