import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderData } from '..'
import { Header } from '@zocom/page-header';
import './style.scss';
import { PrimaryButton } from '@zocom/primary-button';
import { calculateETA } from './calculateETA'

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
  const [remainingMinutes, setRemainingMinutes] = useState<number>(0);

  const navigate = useNavigate(); 
  const handleOrderMore = () => {
    navigate("/")
  }

  useEffect(() => {
    const handleFetchOrder = async () => {
      if (orderNr) {
        const data = await fetchOrder(orderNr);
        const order = data.order;
        setOrder(order ? order : null);
      }
    };
    handleFetchOrder();
  }, []);

  useEffect(() => {
    const deliveryTime = order?.deliveryTime;
    //Initial setup of ETA
    if(deliveryTime) {
      setRemainingMinutes(calculateETA(deliveryTime))
      // Sets up an interval that calculates a new ETA every minute
      const intervalId = setInterval(() => {
        setRemainingMinutes(calculateETA(deliveryTime));
      }, 60000); // 60000 milliseconds = 1 minute
      return () => clearInterval(intervalId);
    }
  }, [order]);

  return (
    <section className="confirmation-page">
      <Header />
      <main className="confirmation-wrap">
        <img src="/public/assets/boxtop 1.png" alt="" />
        {
          order && remainingMinutes <= 0 ? (
            <>
              <h2 className="title">DINA WONTONS ÄR KLARA</h2>
              <section>
                <p className='order-id'>#{order.orderNr}</p>
              </section>
            </>
          ) : (            
            <> 
              <h2 className="title">DINA WONTONS TILLAGAS!</h2>
              <section>
                <p className='eta-text'>ETA {remainingMinutes} min</p>
                <p className='order-id'>#{order?.orderNr}</p>
              </section>
            </>
          )
        }
        <section className="button__container">
          <PrimaryButton className='black-bg' title='Beställ mer' action={handleOrderMore}/>
          {/* <PrimaryButton className='no-bg' title='Se kvitto'/> THIS WILL BE A MODAL*/ }
        </section>
      </main>
    </section>
  );
};
