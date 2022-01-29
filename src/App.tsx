import React, { useEffect, useState } from "react";

import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./assets/styles/style.scss";
import Signup from "./views/Account/Signup";
import ReceiveToken from "./services/LocalStorage/jwt/receive-token";
import Signin from "./views/Account/Signin";
import ErrorPage from "./views/Error";
import axios from "axios";
import Main from "./views/Main";
import { useSetRecoilState } from "recoil";
import { SettingsAtom } from "./views/Main/recoil/MainAtom";

function App() {
  const [backendIsAlive, setBackendIsAlive] = useState(true);
  const token = ReceiveToken();
  const setTokenExpirationDate = useSetRecoilState(SettingsAtom);

  useEffect(() => {
    axios
      .get("/", { headers: { ["x-access-token"]: token } })
      .then((res) => {
        setTokenExpirationDate((prev) => ({
          ...prev,
          __token: {
            expireIn: res.data.token.expireIn,
            createdAt: res.data.token.createdAt,
          },
        }));
        return setBackendIsAlive(true);
      })
      .catch((error) => {
        const status = error.toJSON();
        if (status.status === 401) {
          setBackendIsAlive(true);
          // return RemoveToken();
        } else if (status.message === "Network Error") {
          return setBackendIsAlive(false);
        } else {
          return setBackendIsAlive(false);
        }
        // return setBackendIsAlive(false);
      });
  }, []);

  return (
    <div className={"root-wrapper"}>
      {backendIsAlive ? (
        <Routes>
          {ReceiveToken() ? (
            <>
              <Route path={"/"} element={<Main />}>
                <Route path={"/settings"} element={<Outlet />} />
              </Route>
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
