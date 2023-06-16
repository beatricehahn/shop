import { useContext } from 'react';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { CartContext } from '../../contexts/cart.context';

import {
    ProductCardContainer,
    ProductFooter,
    ItemName,
    Price
} from './product-card.styles.jsx';

const ProductCard = ( { product } ) => {
    const { name, price, imageUrl } = product;
    const { addItemToCart } = useContext(CartContext);

    const addProductToCart = () => addItemToCart(product);

    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`} />
            <ProductFooter>
                <ItemName>{name}</ItemName>
                <Price>{price}</Price>
            </ProductFooter>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} 
            onClick={addProductToCart}>
                Add to cart
            </Button>
        </ProductCardContainer>
    )
}

export default ProductCard;