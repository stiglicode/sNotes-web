import React, { useEffect } from "react";
import EditorLayer from "../../components/layer/EditorLayer";
import ManagementLayer from "../../components/layer/ManagementLayer";
import { Close, Menu } from "@mui/icons-material";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CacheStoreAtom, ManagerOpenStateAtom, SettingsAtom, UserDetailsAtom } from "./recoil/MainAtom";
import ReceiveToken from "../../services/LocalStorage/jwt/receive-token";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import Modal from "../../components/ui/Modal";
import { useCountdown } from "../../utilities/hooks/useCountdown";

const Main = () => {
  const [isManagerOpen, setManagerOpen] = useRecoilState(ManagerOpenStateAtom);
  const setUserDetails = useSetRecoilState(UserDetailsAtom);
  const location = useLocation();
  const { __token } = useRecoilValue(SettingsAtom);
  const { hours, minutes, seconds } = useCountdown(__token.expireIn, { every: "second" });

  useEffect(() => {
    const token = ReceiveToken();

    if (typeof token === "string" && token.length > 1) {
      axios
        .post("/auth/user", { ["x-access-token"]: token })
        .then((res) => {
          return setUserDetails(res?.data);
        })
        .catch(() => {
          return <Navigate to={"/login"} />;
        });
    }
  }, []);

  const handleManagerOpen = () => {
    return setManagerOpen(!isManagerOpen);
  };

  return (
    <div className={"root-layer"}>
      <Button variant={"contained"} className={"manager-opener"} aria-label={"oppener"} onClick={handleManagerOpen}>
        <Menu className={`${!isManagerOpen ? "active" : ""}`} />
        <Close className={`${isManagerOpen ? "active" : ""}`} />
      </Button>
      <EditorLayer atom={[ManagerOpenStateAtom]} />
      <ManagementLayer atom={[ManagerOpenStateAtom, UserDetailsAtom, CacheStoreAtom]} />
      {location.pathname === "/settings" ? (
        <Modal
          body={
            <div>
              <div>
                <span>Hours: </span>
                <strong>{hours}</strong>
              </div>
              <div>
                <span>Minutes: </span>
                <strong>{minutes}</strong>
              </div>
              <div>
                <span>Seconds:</span>
                <strong>{seconds}</strong>
              </div>
            </div>
          }
          onClose={() => console.log("aaa")}
          onOk={() => {
            console.log("bbb");
          }}
          closeText={"Dismis"}
          label={"Global settings"}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Main;
