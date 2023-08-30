import { createSlice } from "@reduxjs/toolkit";
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

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;
const initialState: AuthState = {
  loading: false,
  isLoggedIn: userToken !== null ? true : false,
  userInfo: {},
  userToken,
  error: null,
  success: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
export const selectTheme = (state: RootState) => state.auth;
export default authSlice.reducer;
