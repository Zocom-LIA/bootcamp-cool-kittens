import { CartModal } from '@zocom/cart-modal'
import './style.scss';

export const Header = () => {
    return (
        <article className='page-header'>
            { window.location.pathname.includes('/order') ?
            <img src="/assets/header-logo.svg" alt="YYGS logo" />
            : window.location.pathname.includes('/kitchen') ? 
            <>
            <img src="/assets/header-logo.svg" alt="YYGS logo" />
            <h1>Kitchen view</h1>
            </> :
            <>
            <img src="/assets/header-logo.svg" alt="YYGS logo" />
            <CartModal/>
            </>
            }
        </article>
    )
}