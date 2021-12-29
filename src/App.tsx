import React, { useEffect, useState } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import "./assets/styles/style.scss";
import Signup from "./views/Account/Signup";
import ReceiveToken from "./services/LocalStorage/jwt/receive-token";
import Signin from "./views/Account/Signin";
import ErrorPage from "./views/Error";
import axios from "axios";

function App() {
  const [backendIsAlive, setBackendIsAlive] = useState(true);

  useEffect(() => {
    axios
      .get("/")
      .then((res) => {
        console.log(res);
        return setBackendIsAlive(true);
      })
      .catch(() => {
        return setBackendIsAlive(false);
      });
  }, []);

  return (
    <div className={"root-wrapper"}>
      {backendIsAlive ? (
        <Routes>
          {ReceiveToken() ? (
            <>
              <Route path={"/"} element={<div>aaaa</div>} />
              <Route path={"*"} element={<ErrorPage statusCode={404} message={"This page doesn't exist"} home />} />
            </>
          ) : (
            <>
              <Route path="*" element={<Navigate to="/login" />} />
              <Route path={"/register"} element={<Signup />} />
              <Route path={"/login"} element={<Signin />} />
            </>
          )}
        </Routes>
      ) : (
        <ErrorPage
          statusCode={503}
          message={"Servers are temporary down"}
          additionalMessage={"Please wait until the servers will be alive again"}
        />
      )}
    </div>
  );
}

export default App;
