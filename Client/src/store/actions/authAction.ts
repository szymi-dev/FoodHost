import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/auth.service";

export interface LoginData {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginData, { rejectWithValue }) => {
    try {
      const data = await authService.login({ email, password });
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
