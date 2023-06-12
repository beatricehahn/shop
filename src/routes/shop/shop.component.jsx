import SHOP_DATA from '../../shop-data.json';

// list out a mock list of shop items
const Shop = () => {
    return (
        <div>
            {SHOP_DATA.map(({id, name}) => (
                <div key={id}>
                    <h1>{name}</h1>
                </div>
            ))}
        </div>
    );
};

export default Shop;