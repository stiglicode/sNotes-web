import React from "react";
import RichTextEditor from "../../layout/Editor";
import { useRecoilValue } from "recoil";
import { ISettingsAtom, PropsAndAtom } from "../../../utilities/types/atom.type";

const EditorLayer: PropsAndAtom<ISettingsAtom> = ({ atom }) => {
  const { managerOpenStatus } = useRecoilValue(atom[0]);
  return (
    <div className={`layer ${!managerOpenStatus ? "close" : ""} editor-layer`}>
      <RichTextEditor />
    </div>
  );
};

export default EditorLayer;
