import { useEffect, useState } from 'react';
import { Header } from '@zocom/page-header';
import { useParams } from 'react-router-dom';
import { FoodBoxIcon } from '../../../core/assets/foodBoxIcon'
import { PrimaryButton } from '@zocom/primary-button'
import { orderData } from '..';
import './style.scss';



export const ConfirmationPage = () => {
  const { orderNr } = useParams();
  const {fetchOrder} = orderData();
  const [order, setOrder] = useState({})

  useEffect(() => {
    async function handleFetchOrder() {
        if(orderNr) {
          const data = await fetchOrder(orderNr)
          const order = data.order
          setOrder(order? order:null)
          console.log("Order", order)
        }
    }
    handleFetchOrder();
}, []);
  

  return (
    <div className='confirmation-page'>
      <Header />
      {FoodBoxIcon}
      <main className='menu-wrap'>
        <h2 className='menu-title'>DINA WONTONS TILLAGAS</h2>
        <section>
        </section>
        <section className='eta-timer'>
          {/* <p>ETA: {eta} minuter</p> */}
          {/* <p>Order ID: {orderId}</p>  */}
        </section>
        <section className='action'>
        {/* <PrimaryButton className='black-bg' title='Beställ mer' />
        <PrimaryButton className='no-bg' title='Se Kvitto' /> */}
        </section>
      </main>
    </div>
  );
};
