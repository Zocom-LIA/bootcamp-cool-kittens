import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Order } from '@zocom/types'
import { Header } from '@zocom/page-header';
import { ReceiptModal } from '@zocom/receipt-modal';
import { PrimaryButton } from '@zocom/primary-button';
import { calculateETA } from './calculateETA'
import { orderData } from '..'
import './style.scss';

export const ConfirmationPage = () => {
  const { orderNr } = useParams();
  const { fetchOrder } = orderData();
  const [order, setOrder] = useState<Order>();
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
        console.log('order', order);
        
      }
    };
    handleFetchOrder();
  }, []);

  useEffect(() => {
    const deliveryTime = order?.deliveryTime;
    if(deliveryTime) {
      setRemainingMinutes(calculateETA(deliveryTime))
      const intervalId = setInterval(() => {
        setRemainingMinutes(calculateETA(deliveryTime));
      }, 60000);
      return () => clearInterval(intervalId);
    }
  }, [order]);

  const [receiptModalOpen, setReceiptModalOpen] = useState<boolean>(false);

  const handleOnClick = () => {
    setReceiptModalOpen(!receiptModalOpen);
  };

  const backgroundColor = !receiptModalOpen && remainingMinutes <= 0 ? "green-bg" : "default-bg";

  return (
    <section className={`confirmation-page ${backgroundColor}`}>
    <Header />
    { order && receiptModalOpen ? (
      <ReceiptModal orderNr={order.orderNr} orderItems={order.orderItems} totalPrice={order.totalPrice} />
      ):(
        <main className="confirmation-wrap">
          <img src="/assets/boxtop 1.png" alt="" />
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
        </main>
      )}
          <section className="button__container">
            <PrimaryButton className='black-bg' title={ receiptModalOpen ? 'Gör en ny beställning' : 'Beställ mer' } action={handleOrderMore}/>
            <PrimaryButton className='no-bg' title={ receiptModalOpen ? 'Se orderstatus' : 'Se kvitto' } action={handleOnClick}/>
          </section>
    </section>
  );
};
