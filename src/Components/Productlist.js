// Import necessary dependencies from React and Redux
import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';

// ProductList component definition
const ProductList = () => {
  // Use Redux useSelector hook to get product-related state
  const { products, isLoading, errors, searchMessage, searchResults } = useSelector((state) => state.products);

  // Show loading state if products are being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Show error message if there's an error
  if (errors) {
    return <div>Error: {errors}</div>;
  }

  // Determine which products to display (search results or all products)
  const displayProducts = searchResults || products;

  // Styles for the search message
  const searchMessageStyle = {
    padding: '10px 15px',
    marginBottom: '20px',
    borderRadius: '4px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
    fontSize: '0.9rem',
    maxWidth: '300px',
    margin: '0 auto 20px',
    textAlign: 'center',
  };

  // Render the product list
  return (
    <div>
      {/* Display search message if present */}
      {searchMessage && <div style={searchMessageStyle}>{searchMessage}</div>}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {/* Render ProductCard components if products are available, otherwise show "No products found" message */}
        {displayProducts && displayProducts.length > 0 ? (
          displayProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          <div>No products found.</div>
        )}
      </div>
    </div>
  );
};

// Export the ProductList component as the default export
export default ProductList;
