import { CartModal } from '@zocom/cart-modal'
import './style.scss';

export const Header = () => {
    return (
        <article className='page-header'>
            <img src="./assets/header-logo.svg" alt="YYGS logo" />
            <CartModal/>
        </article>
    )
}