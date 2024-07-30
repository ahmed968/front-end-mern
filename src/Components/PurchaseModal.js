// Import React library
import React from 'react';

// PurchaseModal component definition
const PurchaseModal = ({ items, purchaseTime, totalAmount, onClose, country }) => {
  // Styles for the modal overlay
  const modalStyle = {
    display: 'flex',
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  };

  // Styles for the modal content
  const modalContentStyle = {
    backgroundColor: '#000000',
    color: '#ffffff',
    padding: '30px',
    border: '1px solid #888',
    width: '50%',
    maxWidth: '600px',
    borderRadius: '8px',
    maxHeight: '80vh',
    overflowY: 'auto',
  };

  // Styles for the close button
  const closeButtonStyle = {
    color: '#ff0000',
    float: 'right',
    fontSize: '28px',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  // Styles for the purchase list
  const purchaseListStyle = {
    listStyleType: 'none',
    padding: 0,
  };

  // Styles for each purchase item
  const purchaseItemStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '4px',
  };

  // Styles for the purchase item image
  const purchaseItemImageStyle = {
    width: '70px',
    height: '70px',
    objectFit: 'cover',
    marginRight: '15px',
    borderRadius: '4px',
  };

  // Styles for the purchase item title
  const purchaseItemTitleStyle = {
    fontSize: '16px',
  };

  // Render the purchase modal
  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        {/* Close button */}
        <span style={closeButtonStyle} onClick={onClose}>
          &times;
        </span>
        <h2 style={{marginBottom: '20px'}}>Purchase Success</h2>
        <p style={{marginBottom: '15px'}}>Purchased Items Details:</p>
        {/* List of purchased items */}
        <ul style={purchaseListStyle}>
          {items.map((item) => (
            <li key={item.id} style={purchaseItemStyle}>
              <img src={item.poster} alt={item.title} style={purchaseItemImageStyle} />
              <span style={purchaseItemTitleStyle}>{item.title}</span>
            </li>
          ))}
        </ul>
        {/* Purchase details */}
        <p style={{marginTop: '20px'}}>Purchase Time: {purchaseTime}</p>
        <p>Total Amount: ${totalAmount.toFixed(2)}</p>
        <p>Country: {country}</p>
      </div>
    </div>
  );
};

// Export the PurchaseModal component as the default export
export default PurchaseModal;