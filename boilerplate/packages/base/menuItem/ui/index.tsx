type MenuItemProps = {
    title: string,
    price: number,
    desc: string
}

export const MenuItem = ({title, price, desc} : MenuItemProps) => {  
    return (
        <article>
            <section>
                <h3>{title}</h3>
                {/* <hr className='dotted'/> */}
                <h3>{price} sek</h3>
            </section>
            <section>
                <p>{desc}</p>
            </section>
        </article>
    )
}



