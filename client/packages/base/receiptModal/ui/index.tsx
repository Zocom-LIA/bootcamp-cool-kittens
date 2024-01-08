import { ReceiptItem } from '@zocom/receipt-item';
import './style.scss';

type ReceiptModalProps = {
    orderNr: string;
    orderItems: OrderItem[];
    totalPrice: number;
};

type OrderItem = {
    id: string
    title: string
    quantity: number
    price: number
}

export const ReceiptModal = ({orderNr, orderItems, totalPrice}: ReceiptModalProps) => {

    return (
        <main className='receipt__card'>
            <section className='receipt-title__wrap'>
                <img className='receipt-logo' src='/assets/company-logo.svg' alt="" />
                <h2 className='title'>Kvitto</h2>
                <p className='order-id'>#{orderNr}</p>
            </section>
            <section className='receipt-item__container'>
            {
                orderItems && orderItems.map((orderItem)=> (
                    <ReceiptItem 
                    key={orderItem.id} 
                    title={orderItem.title} 
                    quantity={orderItem.quantity} 
                    price={orderItem.price} />
                ))
            }
            </section>
            <article className='price-summary__card'>
                <section>
                    <h3 className='title'>Totalt</h3>
                    <p className='tax'>inkl 20% moms</p>
                </section>
                <h3 className='price-total'>{totalPrice} Sek</h3>
            </article> 
        </main>
    )
}