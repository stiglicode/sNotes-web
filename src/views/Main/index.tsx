import React from "react";
import EditorLayer from "../../components/layer/EditorLayer";
import ManagementLayer from "../../components/layer/ManagementLayer";
import { Close, Menu } from "@mui/icons-material";
import { useRecoilState } from "recoil";
import { ManagerOpenStateAtom } from "./recoil/MainAtom";

const Main = () => {
  const [isManagerOpen, setManagerOpen] = useRecoilState(ManagerOpenStateAtom);

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
      <ManagementLayer atom={[ManagerOpenStateAtom]} />
    </div>
  );
};

export default Main;
