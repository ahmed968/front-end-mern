// Import necessary dependencies from React and Redux
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/slices/UserSlice';
import { searchProducts } from '../redux/slices/ProductSlice';
import './ss.css';
// Import icons from react-icons library
import { FaShoppingCart, FaBars, FaSearch } from 'react-icons/fa';
// Import logo images
import Logo from "../pages/Logo.png";
import lg from "./Logo2.png"

// Navbar component definition
const Navbar = () => {
  // Use Redux useSelector hook to get authentication status and cart items count
  const { isAuth } = useSelector((state) => state.user);
  const { totalItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  
  // State for navbar scroll effect, mobile menu, and search functionality
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Effect to handle navbar scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchProducts(searchTerm));
  };

  // Render the navbar
  return (
    <nav className={`navbar navbar-expand-lg navbar-dark bg-black ${isScrolled ? 'sticky' : ''}`}>
      <div className="container-fluid">
        {/* Logo link */}
        <Link to="/" className="navbar-brand ms-auto me-auto logo-container">
          <img src={Logo} alt="Logo" className="navbar-logo" />
        </Link>
        {/* Mobile menu toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaBars />
        </button>
        {/* Navbar content */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          {/* Secondary logo */}
          <div className="lg-container">
            <Link to="/" className="nav-link">
              <img className='lg' src={lg} alt='lg'/>
            </Link>
          </div>
          <div className="search-and-actions">
            {/* Search form */}
            <form onSubmit={handleSearch} className="d-flex search-form">
              <input
                type="text"
                className="form-control"
                placeholder="Search products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-outline-light" type="submit">
                <FaSearch />
              </button>
            </form>
            {/* Cart icon (only shown when authenticated) */}
            {isAuth && (
              <Link to="/cart" className="nav-link cart-icon-container">
                <FaShoppingCart className="cart-icon" />
                {totalItems > 0 && <span className="cart-counter">{totalItems}</span>}
              </Link>
            )}
            {/* Conditional rendering for login/register or logout buttons */}
            {!isAuth ? (
              <>
                <Link to="/login" className="nav-link">
                  <button type="button" className="btn btn-warning text-white">
                    Login
                  </button>
                </Link>
                <Link to="/register" className="nav-link">
                  <button type="button" className="btn btn-light text-black">
                    Register
                  </button>
                </Link>
              </>
            ) : (
              <button type="button" className="btn btn-danger" onClick={() => dispatch(logout())}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Export the Navbar component as the default export
export default Navbar;
