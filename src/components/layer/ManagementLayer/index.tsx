import React from "react";
import SideMenu from "../../layout/SideMenu";
import { RecoilState, useRecoilValue } from "recoil";
import ProfileManager from "../../layout/ProfileManager";

const ManagementLayer = ({ atom }: { atom: RecoilState<any>[] }) => {
  const managerVisibility = useRecoilValue(atom[0]);

  return (
    <div className={`layer ${managerVisibility ? "active" : ""} management-layer`}>
      <SideMenu atom={[atom[0]]} />
      <span className={`management-layer_file-name ${managerVisibility ? "active" : ""}`}>Name of file</span>
      <ProfileManager atom={[atom[0], atom[1]]} />
    </div>
  );
};

export default ManagementLayer;
