import React, { useEffect, useState } from 'react';
import { Header } from '@zocom/page-header';
import { Link } from 'react-router-dom';
import { FoodBoxIcon } from '../../../core/assets/foodBoxIcon'
import { PrimaryButton } from '@zocom/primary-button'
import './style.scss';



export const ConfirmationPage = () => {
  const [eta, setEta] = useState<number>(5); 
  


  return (
    <div className='confirmation-page'>
      <Header />
      {FoodBoxIcon}
      <main className='menu-wrap'>
        <h2 className='menu-title'>DINA WONTONS TILLAGAS</h2>
        <section>
        </section>
        <section className='eta-timer'>
          <p>ETA: {eta} minuter</p>
          {/* <p>Order ID: {orderId}</p>  */}
        </section>
        <section className='action'>
        <PrimaryButton className='black-bg' title='Beställ mer' />
        <PrimaryButton className='no-bg' title='Se Kvitto' />
        {/* <Link to='/bestall-mer' className='order'>Beställ mer</Link> // 
        <Link to='/se-kvitto' className='receipt'>Se kvitto</Link> // onlick */}
        </section>
      </main>
    </div>
  );
};
