type MenuItemProps = {
    title: string,
    price: number,
}

export const CartItem = ({title, price} : MenuItemProps) => {  
    return (
        <article>
            <section>
                <h3>{title}</h3>
                {/* <hr className='dotted'/> */}
                <h3>{price} sek</h3>
            </section>
            <section></section>
        </article>
    )
}