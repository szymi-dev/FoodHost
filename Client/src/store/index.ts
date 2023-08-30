import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "./reducers/authSlice";
import themeReducer, { ThemeState } from "./reducers/themeSlice";

export interface AppState {
  theme: ThemeState;
  auth: AuthState;
}

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    // Dodaj tutaj inne reduktory, jeśli są
  },
  devTools: true,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
