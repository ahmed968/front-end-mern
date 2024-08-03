import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../redux/slices/cartSlice';
import { addToWishlist } from '../redux/slices/UserSlice';
import './ProductCard.css';
import ProductModal from './ProductModal';
import { toast } from 'react-toastify';
import { FaHeart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const isAuth = useSelector((state) => state.user.isAuth);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!isAuth) {
      navigate('/login');
      toast.info('Please log in to add items to your cart', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      dispatch(addToCart({
        ...product,
        cartItemId: Date.now().toString(),
        quantity: 1
      }));
      toast.success('Product added to cart!', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    if (!isAuth) {
      navigate('/login');
      toast.info('Please log in to add items to your wishlist', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      dispatch(addToWishlist(product));
      toast.success('Product added to wishlist!', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="product-card">
      <div className="card" onClick={openModal}>
        <img src={product.poster} className="card-img-top" alt={product.title} />
        <div className="card-body bg-black">
          <h3 className="card-title text-white">{product.title}</h3>
          <p className="card-text text-light">{product.description.slice(0, 80)}...</p>
          <p className="card-text font-weight-bold text-white">Price: ${product.price}</p>
          <div className="button-group">
            <button className="btn btn-dark" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="btn btn-outline-light wishlist-btn" onClick={handleAddToWishlist}>
              <FaHeart /> Wishlist
            </button>
          </div>
        </div>
      </div>
      {showModal && <ProductModal product={product} onClose={closeModal} />}
    </div>
  );
};

export default ProductCard;
