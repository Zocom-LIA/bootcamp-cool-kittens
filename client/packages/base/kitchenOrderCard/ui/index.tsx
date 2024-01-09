import { PrimaryButton } from '@zocom/primary-button';
import './style.scss';

type CardProps = {
    orderNr: string;
    orderItems: OrderItem[];
    orderStatus: string;
    timeStamp: string;
    deliveryTime: string;
    totalPrice: number;
    buttonAction: () => void;
}

type OrderItem = {
    title: string;
    quantity: number;
    price: number;
}
  

export const KitchenOrderCard = ({ orderNr, orderItems, orderStatus, buttonAction }: CardProps) => {
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
        action={buttonAction}
        />
     </article>
  )
}