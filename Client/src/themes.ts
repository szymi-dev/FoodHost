// src/themes.ts
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#08c873",
    },
    secondary: {
      main: "#f7f7f7",
    },
    info: {
      main: "#010101",
    },
    warning: {
      main: "#ffa726",
    },
    success: {
      main: "#66bb6a",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#065a33",
    },
    secondary: {
      main: "#6e7a83",
    },
    info: {
      main: "#6bd8ab",
    },
    warning: {
      main: "#ffa726",
    },
    success: {
      main: "#08c873",
    },
  },
});
