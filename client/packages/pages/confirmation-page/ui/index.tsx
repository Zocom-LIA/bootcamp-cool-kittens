import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { orderData } from '..'
import { Header } from '@zocom/page-header';
import './style.scss';
import { differenceInMinutes, parse } from 'date-fns';
import { PrimaryButton } from '@zocom/primary-button';

type Order = {
  orderNr: string;
  orderItems: [];
  deliveryTime: string;
  timeStamp: string;
  status: string;
  totalPrice: number;
};

export const ConfirmationPage = () => {
  const { orderNr } = useParams();
  const { fetchOrder } = orderData();
  const [order, setOrder] = useState<Order | null>(null);
  const [remainingMinutes, setRemainingMinutes] = useState(0);

  useEffect(() => {
    const handleFetchOrder = async () => {
      if (orderNr) {
        const data = await fetchOrder(orderNr);
        const order = data.order;
        setOrder(order ? order : null);
        console.log("Order", order);
        
      }
    };

    handleFetchOrder();
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (order) {
      // const deliveryDate = parse(order.deliveryTime, 'yyyy-MM-dd HH:mm:ss', new Date());
      setRemainingMinutes(calculateRemainingMinutes());

      intervalId = setInterval(() => {
        setRemainingMinutes(calculateRemainingMinutes());
      }, 1000); // Update every second
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }; // Cleanup the interval on component unmount
  }, [order]);

  const calculateRemainingMinutes = () => {
    const currentTime = new Date();
    // console.log("Current Time", currentTime);
    
    return Math.max(0, differenceInMinutes(parse(order?.deliveryTime || '', 'yyyy-MM-dd HH:mm:ss', new Date()), currentTime));
  };

  return (
    <section className="confirmation-page">
      <Header />
      <main className="confirmation-wrap">
        <img src="/assets/boxtop 1.png" alt="" />
        <h2 className="title">DINA WONTONS TILLAGAS!</h2>
        {
          order && 
            <section>
              <p className='eta-text'>ETA {remainingMinutes} min</p>
              <p className='order-id'>#{order.orderNr}</p>
            </section>
        }
        <section className="button__container">
          <PrimaryButton className='black-bg' title='Beställ mer'/>
          <PrimaryButton className='no-bg' title='Se kvitto'/>
        </section>
      </main>
    </section>
  );
};
