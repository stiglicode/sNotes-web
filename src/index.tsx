import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { createTheme, ThemeProvider } from "@mui/material";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_SERVER;

const theme = createTheme({
  palette: {
    primary: {
      light: "#FCA31124",
      main: "#FCA311BF",
      dark: "#FCA311",
      contrastText: "#fff",
    },
    secondary: {
      light: "#00121924",
      main: "#001219BF",
      dark: "#001219",
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
