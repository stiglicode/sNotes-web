import React, { useEffect } from "react";
import EditorLayer from "../../components/layer/EditorLayer";
import ManagementLayer from "../../components/layer/ManagementLayer";
import { Close, Menu } from "@mui/icons-material";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ManagerOpenStateAtom, UserDetailsAtom } from "./recoil/MainAtom";
import ReceiveToken from "../../services/LocalStorage/jwt/receive-token";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Main = () => {
  const [isManagerOpen, setManagerOpen] = useRecoilState(ManagerOpenStateAtom);
  const setUserDetails = useSetRecoilState(UserDetailsAtom);

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
      <button className={"manager-opener"} onClick={handleManagerOpen}>
        <Menu className={`${!isManagerOpen ? "active" : ""}`} />
        <Close className={`${isManagerOpen ? "active" : ""}`} />
      </button>
      <EditorLayer />
      <ManagementLayer atom={[ManagerOpenStateAtom, UserDetailsAtom]} />
    </div>
  );
};

export default Main;
