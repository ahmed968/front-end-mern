import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalItems: 0, // New state property to store the total number of items in the cart
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
      state.totalItems += 1; // Increment the totalItems when adding an item
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.totalItems -= 1; // Decrement the totalItems when removing an item
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0; // Reset the totalItems when clearing the cart
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;