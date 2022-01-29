import React from "react";
import RichTextEditor from "../../layout/Editor";
import { RecoilState, useRecoilValue } from "recoil";

const EditorLayer: React.FC<{ atom: RecoilState<any>[] }> = ({ atom }) => {
  const openState = useRecoilValue(atom[0]);
  return (
    <div className={`layer ${!openState ? "close" : ""} editor-layer`}>
      <RichTextEditor />
    </div>
  );
};

export default EditorLayer;
