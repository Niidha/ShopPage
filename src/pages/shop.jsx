import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from './cartprovider';
import './shop.css'

const ShopPage = () => {
    const { cartList, setCartList } = useCart();
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get('https://dummyjson.com/products');
            setProducts(data.products);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Fragment>
            <div>
                {/* Sticky header */}
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        backgroundColor: '#ffffff',
                        zIndex: 1000,
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                        padding: '10px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '50%',
                            padding: '8px',
                            borderRadius: '5px',
                            border: '1px solid #ced4da',
                            marginRight: 'auto', // Pushes search bar to the left
                        }}
                    />
                    <Link
                        to="/cart"
                        style={{
                            position: 'absolute',
                            right: '20px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '8px 15px',
                            backgroundColor: '#21D375',
                            color: '#fff',
                            borderRadius: '5px',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                        }}
                    >
                        <FaShoppingCart style={{ marginRight: '5px' }} /> Cart ({cartList.length})
                    </Link>
                </div>

                {/* Product list */}
                <div style={{ marginTop: '80px' }} className="d-flex justify-content-center gap-2 flex-wrap">
                    {isLoading ? (
                        <p>Loading products...</p>
                    ) : filteredProducts.length === 0 ? (
                        <p>No products found</p>
                    ) : (
                        filteredProducts.map(product => (
                            <div key={product.id} style={{ width: '15rem' }} className="bg-light p-2">
                                <div>
                                    <img
                                        src={product.images[0]}
                                        alt={product.title}
                                        style={{ width: '15rem', objectFit: 'contain', height: '200px' }}
                                    />
                                </div>
                                <div className="text-center">
                                    <h6>{product.title}</h6>
                                    <div className="w-100 d-flex justify-content-between">
                                        <div>
                                            <FaStar /> {product.rating}
                                        </div>
                                        <div>
                                            <s className="text-muted">${product.price}</s> ${(product.price * 0.9).toFixed(2)}
                                        </div>
                                    </div>
                                    <Link to={`/product/${product.id}`} className="btn btn-info w-100 mt-2 text-light">
                                        View Product
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default ShopPage;
