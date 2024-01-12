import './style.scss';

type ReceiptItemProps = {
    title: string;
    price: number;
    quantity: number;
};

export const ReceiptItem = ({title, price, quantity}: ReceiptItemProps) => {
    
    const calculateTotalPrice = () => {
        const totalPrice = price  * quantity
        return totalPrice
    }
    
    return (
        <article className='receipt-item__card'>
            <section className='title'>
                <h3>{title}</h3>
                <hr className='dotted-line'/>
                <h3>{calculateTotalPrice()} Sek</h3>
            </section>
            <p className='quantity'>{quantity} stycken</p>
        </article>
    )
}