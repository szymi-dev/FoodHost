// src/themes.ts
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  typography: {
    fontFamily: ["Roboto", "Arial"].join(","),
    h1: {
      fontSize: "1.2rem",
    },
  },

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
    text: {
      primary: "#000",
      secondary: "#666",
    },
    background: {
      default: "#f7faf9",
      paper: "#08c873",
    },
  },
});

export const darkTheme = createTheme({
  typography: {
    fontFamily: ["Roboto", "Arial"].join(","),
    h1: {
      fontSize: "1.2rem",
    },
  },

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
    text: {
      primary: "#fff", // Kolor tekstu na ciemnym tle
      secondary: "#ccc", // Kolor tekstu pomocniczego na ciemnym tle
    },
    background: {
      default: "#333", // Domyślne tło
      paper: "#065a33",
    },
  },
});
