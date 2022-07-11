import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  loading: false,
  error: null
};

const productSlice = createSlice({
  name: 'product',
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getProduct.fulfilled, (state, action) => {
      state.products = action.payload;
      state.error = null
      state.loading = false
    })
    .addCase(getProduct.pending, (state, action) => {
      state.loading = true
    })
    .addCase(getProduct.rejected, (state, action) => {
      state.error = action.payload;
    })
  },
});

export const getProduct = createAsyncThunk('get/product', async (_, thunkAPI) => {
  try {
    const res = await fetch('http://localhost:4200/product');
    return res.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const cartActions = productSlice.actions;
export default productSlice.reducer;
