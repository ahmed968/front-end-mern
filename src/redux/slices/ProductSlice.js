import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetProducts = createAsyncThunk(
  "Products/get",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/getproduct");
      return res.data;
    } 
    catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

export const searchProducts = createAsyncThunk(
  "Products/search",
  async (searchTerm, { rejectWithValue }) => {
    try {
      if (!searchTerm.trim()) {
        return { products: null, searchMessage: "Please enter a search term" };
      }
      const res = await axios.get(`http://localhost:5000/api/user/searchproduct?term=${searchTerm}`);
      return { ...res.data, searchMessage: null };
    } 
    catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

const ProductSlice = createSlice({
  name: "products",
  initialState: {
    errors: null,
    isLoading: false,
    products: [],
    searchMessage: null,
    searchResults: null
  },
  reducers: {
    clearSearchMessage: (state) => {
      state.searchMessage = null;
      state.searchResults = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetProducts.pending, (state) => {
        state.isLoading = true;
        state.searchMessage = null;
      })
      .addCase(GetProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errors = null;
        state.products = action.payload.products;
        state.searchMessage = null;
        state.searchResults = null;
      })
      .addCase(GetProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
        state.searchMessage = null;
      })
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
        state.searchMessage = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errors = null;
        state.searchResults = action.payload.products;
        state.searchMessage = action.payload.searchMessage;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
        state.searchMessage = null;
      });
  }
});

export const { clearSearchMessage } = ProductSlice.actions;
export default ProductSlice.reducer;
