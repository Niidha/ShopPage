import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


import { FaShoppingCart, FaStar } from "react-icons/fa";

import axios from "axios";
import { useCart } from "./cartprovider";
import toast from "react-hot-toast";
import './details.css'

const ProductDetailsPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null); 
    const { cartList, setCartList } = useCart() 
    const [isLoading, setIsLoading] = useState(true); 

   
    const fetchProductDetails = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get(`https://dummyjson.com/products/${id}`); 
            setProduct(data);
        } catch (error) {
            console.error("Error fetching product details:", error);
            toast.error("Failed to fetch product details");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProductDetails();
    }, [id]);

   
    const handleAddToCart = (product) => {
        const index = cartList.findIndex((cartListItem) => cartListItem.id === product.id);
        if (index === -1) {
            product.quantity = 1;
            setCartList([product, ...cartList]);
        } else {
            const updatedCart = cartList.map((item) => {
                if (item.id === product.id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            setCartList(updatedCart);
        }
        return toast.success("Product added to cart");
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="product-details">
        <div className="d-flex  align-items-center m-1">
            <h3>{product.title}</h3>
            <Link to="/shop" className="btn btn-primary d-flex justify-content-end">
                Shop Now
            </Link>
        </div>
        <div className="d-flex gap-4">
           
            <div>
                <img src={product.images[0]} alt={product.title} style={{ width: "300px" }} />
            </div>

            <div>
                <h5>Price: ${(product.price - (product.price * (product.discountPercentage / 100))).toFixed(2)}</h5>
                <p><FaStar /> {product.rating} stars</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Brand:</strong> {product.brand}</p>
                <p><strong>Stock:</strong> {product.stock}</p>
                <p><strong>Tags:</strong> {product.tags}</p>
                <p><strong>Weight:</strong> {product.weight} kg</p>
                <p><strong>Dimensions:</strong> {`Width: ${product.dimensions.width}, Height: ${product.dimensions.height}, Depth: ${product.dimensions.depth}`}</p>
                <p><strong>Warranty Information:</strong> {product.warrantyInformation}</p>
                <p><strong>Shipping Information:</strong> {product.shippingInformation}</p>
                <p><strong>Availability Status:</strong> {product.availabilityStatus}</p>
                <p><strong>Minimum order Quantity:</strong> {product.minimumOrderQuantity}</p>
                <p><strong>Return Policy:</strong> {product.returnPolicy}</p>

                <button onClick={() => handleAddToCart(product)} className="btn btn-success">
                    <FaShoppingCart /> Add to Cart
                </button>
            </div>
        </div>

       
        <div className="mt-4">
            <h4>Reviews</h4>
            {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review, index) => (
                    <div key={index} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
                        <p><strong>{review.reviewerName}</strong></p>
                        <p>{review.comment}</p>
                        <p>Rating: <FaStar /> {review.rating}</p>
                    </div>
                ))
            ) : (
                <p>No reviews yet. Be the first to review this product!</p>
            )}
        </div>
    </div>
);
};

export default ProductDetailsPage;
