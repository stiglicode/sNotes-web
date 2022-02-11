import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { createTheme, ThemeProvider } from "@mui/material";
import axios from "axios";
import colors from "./assets/styles/modules/colors.module.scss";
import ReceiveToken from "./services/LocalStorage/jwt/receive-token";

const token = ReceiveToken();

axios.defaults.baseURL = process.env.REACT_APP_API_SERVER;
axios.defaults.headers.common["x-access-token"] = token;

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
    error: {
      main: colors.error,
    },
    info: {
      main: colors.info,
    },
    success: {
      main: colors.success,
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
