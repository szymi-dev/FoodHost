import "./App.scss";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { selectTheme, toggleTheme } from "./store/reducers/themeSlice";
import { AppDispatch } from "./store";
import { darkTheme, lightTheme } from "./themes";
import { CssBaseline } from "@mui/material";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Route,
  Routes, // Dodaliśmy komponent Routes
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import React, { Suspense } from "react";

import { MoonLoader } from "react-spinners";

// Import opóźnionych komponentów
const Homepage = React.lazy(() => import("./pages/Homepage"));
const Login = React.lazy(() => import("./pages/Login"));

function App() {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch<AppDispatch>();
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <div className="App">
        <Header currentTheme={theme} onThemeToggle={handleThemeToggle} />
        {/* Użyj React.Suspense wokół komponentów Route */}
        <Router>
          <Suspense
            fallback={
              <div className="loading_container">
                <MoonLoader size={100} color="#37c84d" />{" "}
              </div>
            }
          >
            <Routes>
              {" "}
              {/* Używamy komponentu Routes */}
              {/* Użyj komponentów Homepage i Login jako Route wewnątrz Routes */}
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              {/* Inne trasy */}
            </Routes>
          </Suspense>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
