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
  
export const KitchenOrderCard = ({ orderNr, orderItems, orderStatus, totalPrice }: CardProps) => {
  
  const { setOrdersByStatus} = useContext(AppContext);

  const updateOrderStatus = async (orderNr: string) => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL
    const API_ENDPOINT = `/updateOrderStatus`
    const API_URL = BASE_URL + API_ENDPOINT 
    // const API_URL = "https://s1ev3z9454.execute-api.eu-north-1.amazonaws.com/api/updateOrderStatus";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${import.meta.env.VITE_AUTH_API_KEY}`
        },
        body: JSON.stringify({
          orderNr: orderNr,
          orderStatus: "ready",
        }),
      });

      const data =  await response.json();
      const updatedOrder = data?.order
      console.log(updatedOrder);
      

      setOrdersByStatus((prevOrders) => {
        const preparingOrders = prevOrders["preparing"].filter((order) => order.orderNr !== orderNr)
        const doneOrders = [...prevOrders["ready"], updatedOrder] 

        return {
          ...prevOrders,
          preparing: preparingOrders,
          ready: doneOrders
        }
      });

    } catch (error) {
      console.error("Error updating order status:", error);
    }
    
  }
  
  return (
     <article className={`kitchen-order__card ${ orderStatus === "preparing" ? 'red-card' : 'green-card' }`}>
        <h2 className='order-number'>#{orderNr}</h2>
        <section className='order-contents__container'>
         {
          orderItems && orderItems.map((item, index) => (
            <section key={index} className='order-item__wrap'>
              <section className='title-qty__wrap'>
                <h3 className='item-name'>{item.title}</h3>
                <hr className='dotted-line'/>
                <h3>{item.quantity} st</h3>
              </section>
              <h3 className='item-total'>{item.price * item.quantity} sek</h3>
            </section>
          ))
        }
        </section>
        <p className='order-total'>{totalPrice} sek</p>
        { orderStatus === "preparing" ? 
          <p className='wait-timer'>Väntat i {}</p> 
          :
          <p className='wait-timer'>Tillagningstid {}</p>
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