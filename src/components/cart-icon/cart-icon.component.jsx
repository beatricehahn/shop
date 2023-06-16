import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { 
    ShoppingIcon, 
    CartIconContainer, 
    ItemCount 
} from './cart-icon.styles.jsx';

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    const dropdownToggler = () => setIsCartOpen(!isCartOpen);
    
    return (
        <CartIconContainer onClick={dropdownToggler}>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;
