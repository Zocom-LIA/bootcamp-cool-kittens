
//import React from "react";
import './style.scss';

type OrderItem = {
id: string,
title: string,
quantity: number,
price: number,
}

type KitchenOrderItemProps = {
orderItem: OrderItem,
}

export const KitchenOrderItem = ({ orderItem }: KitchenOrderItemProps) => {
  // Additional functionality related to kitchen orders can be added here

return (
    <article className='kitchen-order__item'>
    <section className='title'>
        <h3>{orderItem.title}</h3>
        <hr className='dotted-line' />
        <h3>Quantity: {orderItem.quantity}</h3>
        <h3>Total: {orderItem.price * orderItem.quantity} sek</h3>
    </section>
    </article>
);
};

