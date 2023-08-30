import "./App.scss";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { selectTheme, toggleTheme } from "./store/reducers/themeSlice";
import { AppDispatch } from "./store";
import { darkTheme, lightTheme } from "./themes";
import { CssBaseline } from "@mui/material";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import "react-toastify/dist/ReactToastify.css";

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
        <BrowserRouter>
          <Header currentTheme={theme} onThemeToggle={handleThemeToggle} />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
