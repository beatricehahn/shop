import { createContext, useState } from 'react';

import PRODUCTS from '../shop-data.json';

export const ProductContext = createContext({
    products: []
});

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUCTS);
    const val = {products};
    
    return (
        <ProductContext.Provider value={val}>
            {children}
        </ProductContext.Provider>
    );
};

/* notes: 
      to use context, you need the context values 
      themselves and also a context provider
 */