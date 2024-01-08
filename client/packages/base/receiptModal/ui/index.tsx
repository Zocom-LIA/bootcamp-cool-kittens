import { Header } from '@zocom/page-header';
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
            <main>
                <article>
                    <section>
                        <img src='/assets/company-logo.svg' alt="" />
                        <h2>Kvitto</h2>
                        <p>{orderNr}</p>
                    </section>
                    {
                        orderItems && orderItems.map((orderItem)=> (
                            <ReceiptItem 
                            key={orderItem.id} 
                            title={orderItem.title} 
                            quantity={orderItem.quantity} 
                            price={orderItem.price} />
                        ))
                    }
                    <article>
                        <section>
                            <h3>Totalt</h3>
                            <p>inkl 20% moms</p>
                        </section>
                        <h3>{totalPrice} Sek</h3>
                    </article> 
                </article>
            </main>
    )
}