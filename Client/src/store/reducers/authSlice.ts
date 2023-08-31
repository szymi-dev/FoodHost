import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { RootState } from "..";
import { loginUser } from "../actions/authAction";

export interface AuthState {
  loading: boolean;
  isLoggedIn: boolean;
  userInfo: object;
  userToken: unknown;
  error: unknown;
  success: boolean;
}

const userToken = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;
const initialState: AuthState = {
  loading: false,
  isLoggedIn: userToken != null ? true : false,
  userInfo: jwt_decode(userToken as string),
  userToken,
  error: null,
  success: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: state => {
      localStorage.removeItem("token");
      state.isLoggedIn = false;
      state.loading = false;
      state.userInfo = {};
      state.userToken = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, (state: AuthState) => {
        state.isLoggedIn = false;
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state: AuthState, action) => {
        state.isLoggedIn = true;
        state.loading = false;
        state.userInfo = action.payload;
        state.userToken = action.payload.token;
      })
      .addCase(loginUser.rejected, (state: AuthState, action) => {
        state.isLoggedIn = false;
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { logout } = authSlice.actions;
export const authTheme = (state: RootState) => state.auth;
export default authSlice.reducer;
