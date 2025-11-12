// src/main.jsx
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import App from "./App";
import "./index.css";
import { Done } from "@mui/icons-material";

export const theme = createTheme({
  palette: {
    mode: "dark", // ← This enables dark theme globally
    background: {
      default: "#0f0f0f", // deep dark
      paper: "rgba(30, 30, 30, 0.6)", // semi-transparent
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
