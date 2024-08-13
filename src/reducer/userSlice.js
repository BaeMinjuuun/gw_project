// src/reducer/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("user")) || null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // 로컬 스토리지에 저장
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
      localStorage.removeItem("user"); // 로컬 스토리지에서 제거
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUserInfo, clearUserInfo, setStatus, setError } =
  userSlice.actions;
export default userSlice.reducer;
