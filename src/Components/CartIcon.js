// Import necessary dependencies from React and Redux
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// CartIcon component definition
const CartIcon = () => {
  // Use Redux useSelector hook to get cart items from the state
  const cartItems = useSelector((state) => state.cart.items);
  
  // Calculate the total number of items in the cart
  const itemCount = cartItems.length;

  // Render the cart icon with item count
  return (
    // Link to the cart page
    <Link to="/cart">
      <div>
        {/* Text label for the cart */}
        <span>Cart</span>
        {/* Display the number of items in the cart */}
        <span>{itemCount}</span>
      </div>
    </Link>
  );
};

// Export the CartIcon component as the default export
export default CartIcon;
