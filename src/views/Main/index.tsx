import React, { useEffect } from "react";
import EditorLayer from "../../components/layer/EditorLayer";
import ManagementLayer from "../../components/layer/ManagementLayer";
import { Close, Menu } from "@mui/icons-material";
import { useRecoilState, useSetRecoilState } from "recoil";
import { CacheStoreAtom, SettingsAtom, UserDetailsAtom } from "./recoil/MainAtom";
import ReceiveToken from "../../services/LocalStorage/jwt/receive-token";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import SettingsRoute from "../../components/layer/ManagementLayer/Settings";

const Main = () => {
  const [{ managerOpenStatus }, setManagerOpen] = useRecoilState(SettingsAtom);
  const setUserDetails = useSetRecoilState(UserDetailsAtom);
  const t = useParams();

  // const { __token } = useRecoilValue(SettingsAtom);
  // const { hours, minutes, seconds } = useCountdown(__token.expireIn, { every: "second" });

  useEffect(() => {
    const token = ReceiveToken();
    if (typeof token === "string" && token.length > 1) {
      axios
        .post("/auth/user")
        .then((res) => {
          return setUserDetails(res?.data);
        })
        .catch(() => {
          return <Navigate to={"/login"} />;
        });
    }
  }, []);

  const handleManagerOpen = () => {
    return setManagerOpen((prev) => ({ ...prev, managerOpenStatus: !managerOpenStatus }));
  };

  useEffect(() => {
    console.log(t);
  }, [t]);

  return (
    <div className={"root-layer"}>
      <Button variant={"contained"} className={"manager-opener"} aria-label={"oppener"} onClick={handleManagerOpen}>
        <Menu className={`${!managerOpenStatus ? "active" : ""}`} />
        <Close className={`${managerOpenStatus ? "active" : ""}`} />
      </Button>
      <EditorLayer atom={[SettingsAtom]} />
      <ManagementLayer atom={[SettingsAtom, UserDetailsAtom, CacheStoreAtom]} />
      <SettingsRoute atom={[CacheStoreAtom, SettingsAtom, UserDetailsAtom]} />
    </div>
  );
};

export default Main;
