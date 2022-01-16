import React from "react";
import SideMenu from "../../layout/SideMenu";
import { RecoilState, useRecoilValue } from "recoil";
import ProfileManager from "../../layout/ProfileManager";

const ManagementLayer: React.FC<{ atom: RecoilState<any>[] }> = ({ atom }) => {
  const managerVisibility = useRecoilValue(atom[0]);
  const { selected } = useRecoilValue(atom[2]);

  return (
    <div className={`layer ${managerVisibility ? "active" : ""} management-layer`}>
      <SideMenu atom={[atom[0], atom[2]]} />
      <span className={`management-layer_file-name ${managerVisibility ? "active" : ""}`}>
        {selected?.type === "file" ? selected?.name : ""}
      </span>
      <ProfileManager atom={[atom[0], atom[1]]} />
    </div>
  );
};

export default ManagementLayer;
