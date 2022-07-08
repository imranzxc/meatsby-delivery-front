import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./shopping-cart/authSlice";
import cartSlice from "./shopping-cart/cartSlice";
import cartUiSlice from "./shopping-cart/cartUiSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    cartUi: cartUiSlice.reducer,
    auth: authSlice
  },
});

export default store;
