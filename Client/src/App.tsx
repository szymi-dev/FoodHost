import "./App.scss";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { selectTheme, toggleTheme } from "./store/reducers/themeSlice";
import { AppDispatch } from "./store";
import { darkTheme, lightTheme } from "./themes";
import { CssBaseline } from "@mui/material";

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
        <header className="App-header">
          <button onClick={handleThemeToggle}>Toggle Theme</button>
          <p>Current Theme: {theme}</p>
          {/* Reszta Twojej aplikacji */}
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
