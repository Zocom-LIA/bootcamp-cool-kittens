import { CartModal } from '@zocom/cart-modal'
import './style.scss';

export const Header = () => {
    return (
        <>
            { window.location.pathname.includes('/order') ?
            <article className='mobile-header'>
                <img src="/assets/header-logo.svg" alt="YYGS logo" />
            </article> :
            window.location.pathname.includes('/kitchen') ? 
            <article className='kitchen-header'>
                <img src="/assets/header-logo.svg" alt="YYGS logo" />
                <h1 className='page-title'>Kitchen view</h1>
            </article> : 
            <article className='mobile-header'>
                <img src="/assets/header-logo.svg" alt="YYGS logo" />
                <CartModal/>
            </article>
            }
        </>
    )
}