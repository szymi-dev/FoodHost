import "./App.scss";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { selectTheme, toggleTheme } from "./store/reducers/themeSlice";
import { AppDispatch } from "./store";
import { darkTheme, lightTheme } from "./themes";
import { CssBaseline } from "@mui/material";
import Header from "./components/Header";

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
      </div>
    </ThemeProvider>
  );
}

export default App;
