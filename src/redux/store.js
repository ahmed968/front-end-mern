import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice";
import productReducer from "./slices/ProductSlice";  // Renamed to follow consistent naming convention
import cartReducer from './slices/cartSlice';
export default configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    cart: cartReducer
  },
});
