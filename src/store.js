import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./reducer/modalSlice";
import userReducer from "./reducer/userSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    user: userReducer,
  },
});

export default store;
