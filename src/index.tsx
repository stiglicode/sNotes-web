import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { createTheme, ThemeProvider } from "@mui/material";
import colors from "./assets/styles/modules/colors.module.scss";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_SERVER;

const theme = createTheme({
  palette: {
    primary: {
      light: colors.primaryLight,
      main: colors.primary,
      dark: colors.primaryDark,
      contrastText: "#fff",
    },
    secondary: {
      light: colors.secondaryLight,
      main: colors.secondary,
      dark: colors.secondaryDark,
      contrastText: "#fff",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
