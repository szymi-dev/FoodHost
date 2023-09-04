import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { RootState } from "..";
import { loginUser, registerUser } from "../actions/authAction";

export interface AuthState {
  message: string;
  loading: boolean;
  isLoggedIn: boolean;
  userInfo: object | null;
  userToken: unknown | null;
  error: unknown;
  success: boolean;
}

const userToken = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;
const initialState: AuthState = {
  message: "",
  loading: false,
  isLoggedIn: userToken != null ? true : false,
  userInfo: userToken != null ? jwt_decode(userToken as string) : null,
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
      state.message = "User logout";
      state.isLoggedIn = false;
      state.loading = false;
      state.userInfo = {};
      state.userToken = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, (state: AuthState) => {
        state.message = "Registration started";
      })
      .addCase(registerUser.fulfilled, (state: AuthState) => {
        state.message = "Registration succesfull!";
      })
      .addCase(registerUser.rejected, (state: AuthState) => {
        state.message = "Registration failed!";
      })
      .addCase(loginUser.pending, (state: AuthState) => {
        state.message = "login...";
        state.isLoggedIn = false;
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state: AuthState, action) => {
        state.message = "User logged";
        state.isLoggedIn = true;
        state.loading = false;
        state.userInfo = action.payload;
        state.userToken = action.payload.token;
      })
      .addCase(loginUser.rejected, (state: AuthState, action) => {
        state.message = "Can't loggin user";
        state.isLoggedIn = false;
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { logout } = authSlice.actions;
export const authTheme = (state: RootState) => state.auth;
export default authSlice.reducer;
