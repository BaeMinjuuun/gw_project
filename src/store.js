import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./reducer/modalSlice"; // modalSlice의 경로에 맞게 수정

const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});

export default store;
