// Import necessary dependencies from React and Redux
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import './ProductModal.css';

// ProductModal component definition
const ProductModal = ({ product, onClose }) => {
  const dispatch = useDispatch();

  // Handler for adding product to cart
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  // Render the product modal
  return (
    // Modal overlay with click handler to close the modal
    <div className="modal-overlay" onClick={onClose}>
      {/* Blurred background for the modal */}
      <div className="modal-blur-background"></div>
      {/* Modal content */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="close-btn" onClick={onClose}>&times;</button>
        {/* Product title */}
        <h2>{product.title}</h2>
        {/* Product images */}
        <div className="modal-images">
          {product.images && product.images.length > 0 ? (
            // If product has multiple images, display all of them
            product.images.map((image, index) => (
              <img key={index} src={image} alt={`${product.title} - ${index + 1}`} />
            ))
          ) : (
            // If no images array, display the poster image
            <img src={product.poster} alt={product.title} />
          )}
        </div>
        {/* Product description */}
        <p>{product.description}</p>
        {/* Product price */}
        <p className="price">Price: ${product.price}</p>
        {/* Add to Cart button */}
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// Export the ProductModal component as the default export
export default ProductModal;
