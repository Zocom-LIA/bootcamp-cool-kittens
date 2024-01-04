import { useState } from 'react';
import { Header } from '@zocom/page-header';
// import { Link } from 'react-router-dom';
import { PrimaryButton } from '@zocom/primary-button'
import './style.scss';



export const ConfirmationPage = () => {
  const [eta, setEta] = useState<number>(5); 
  
  return (
    <section className='confirmation-page'>
      <Header />
      <main className='confirmation-wrap'>
        <img src="./public/assets/boxtop 1.png" alt="" />
        <h2 className='title'>DINA WONTONS TILLAGAS!</h2>
        <section>
          <p className='eta-text'>ETA {eta} min</p>
          <p className='order-id'>#86590238052
            {/* {orderId} */}
            </p> 
        </section>
        <section className='button__container'>
        <PrimaryButton className='black-bg' title='Beställ mer' />
        <PrimaryButton className='no-bg' title='Se Kvitto' />
        {/* <Link to='/bestall-mer' className='order'>Beställ mer</Link> // 
        <Link to='/se-kvitto' className='receipt'>Se kvitto</Link> // onlick */}
        </section>
      </main>
    </section>
  );
};
