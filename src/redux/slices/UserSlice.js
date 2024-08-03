import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const RegisterUser = createAsyncThunk(
  "user/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:5000/api/user/register", data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("isAuth", "true");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

export const LoginUser = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:5000/api/user/login", data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("isAuth", "true");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

export const GoogleLogin = createAsyncThunk(
  "user/googleLogin",
  async (tokenId, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:5000/api/user/google-auth", { tokenId });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("isAuth", "true");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

export const getUserData = createAsyncThunk(
  "user/getData",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "user/addToWishlist",
  async (product, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().user;
      const res = await axios.post(
        "/user/wishlist",
        { productId: product.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.msg);
    }
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    isAuth: localStorage.getItem("isAuth") === "true" || false,
    errors: null,
    isLoading: false,
    wishlist: [],
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("isAuth");
      state.isAuth = false;
      state.token = null;
      state.user = null;
      state.errors = null;
      state.wishlist = [];
    },
    clearErrors: (state) => {
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(RegisterUser.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.errors = null;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
        state.isAuth = false;
      })
      // Login User
      .addCase(LoginUser.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.errors = null;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
        state.isAuth = false;
      })
      // Google Login
      .addCase(GoogleLogin.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(GoogleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.errors = null;
      })
      .addCase(GoogleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
        state.isAuth = false;
      })
      // Get User Data
      .addCase(getUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
      })
      // Add to Wishlist
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishlist = action.payload.wishlist;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
      });
  },
});

export const { logout, clearErrors } = UserSlice.actions;
export default UserSlice.reducer;
