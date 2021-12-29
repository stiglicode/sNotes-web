import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import "./assets/styles/style.scss";
import Signup from "./views/Account/Signup";
import ReceiveToken from "./services/LocalStorage/jwt/receive-token";
import Signin from "./views/Account/Signin";
import ErrorPage from "./views/Error/ErrorPage";

function App() {
  return (
    <div className={"root-wrapper"}>
      <Routes>
        {ReceiveToken() ? (
          <>
            <Route path={"/"} element={<div>aaaa</div>} />
            <Route path={"*"} element={<ErrorPage statusCode={404} message={"This page doesn't exist"} /> } />
          </>
        ) : (
          <>
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path={"/register"} element={<Signup />} />
            <Route path={"/login"} element={<Signin />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
