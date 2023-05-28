import { User } from "./../../types/User";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: <User>{},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = { ...action.payload };
    },
    logout: (state) => {
      state.user = <User>{};
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
