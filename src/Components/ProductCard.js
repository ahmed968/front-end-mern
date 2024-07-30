// Import necessary dependencies from React and Redux
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { addToWishlist } from '../redux/slices/UserSlice';
import './ProductCard.css';
import ProductModal from './ProductModal';
import { toast } from 'react-toastify';
import { FaHeart } from 'react-icons/fa';

// ProductCard component definition
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  // State to control the visibility of the product modal
  const [showModal, setShowModal] = useState(false);

  // Handler for adding product to cart
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    dispatch(addToCart(product));
    // Show success toast notification
    toast.success('Product added to cart!', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Handler for adding product to wishlist
  const handleAddToWishlist = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    dispatch(addToWishlist(product));
    // Show success toast notification
    toast.success('Product added to wishlist!', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Function to open the product modal
  const openModal = () => {
    setShowModal(true);
  };

  // Function to close the product modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Render the product card
  return (
    <div className="product-card">
      <div className="card" onClick={openModal}>
        {/* Product image */}
        <img src={product.poster} className="card-img-top" alt={product.title} />
        <div className="card-body bg-black">
          {/* Product title */}
          <h3 className="card-title text-white">{product.title}</h3>
          {/* Product description (truncated) */}
          <p className="card-text text-light">{product.description.slice(0, 80)}...</p>
          {/* Product price */}
          <p className="card-text font-weight-bold text-white">Price: ${product.price}</p>
          <div className="button-group">
            {/* Add to Cart button */}
            <button className="btn btn-dark" onClick={handleAddToCart}>
              Add to Cart
            </button>
            {/* Add to Wishlist button */}
            <button className="btn btn-outline-light wishlist-btn" onClick={handleAddToWishlist}>
              <FaHeart /> Wishlist
            </button>
          </div>
        </div>
      </div>
      {/* Render ProductModal component if showModal is true */}
      {showModal && <ProductModal product={product} onClose={closeModal} />}
    </div>
  );
};

// Export the ProductCard component as the default export
export default ProductCard;
