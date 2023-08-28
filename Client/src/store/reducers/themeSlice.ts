import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface ThemeState {
  currentTheme: "light" | "dark";
}
const initialState: ThemeState = {
  currentTheme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: state => {
      state.currentTheme = state.currentTheme === "light" ? "dark" : "light";
    },
  },
});
export const { toggleTheme } = themeSlice.actions;
export const selectTheme = (state: RootState) => state.currentTheme;
export default themeSlice.reducer;
