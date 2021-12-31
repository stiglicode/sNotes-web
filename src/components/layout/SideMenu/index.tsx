import React from "react";
import { RecoilState, useRecoilValue } from "recoil";

const SideMenu = ({ atom }: { atom: RecoilState<boolean>[] }) => {
  const managerVisibility = useRecoilValue(atom[0]);

  return <div className={`side-menu ${managerVisibility ? "active" : ""}`}>SideMenu</div>;
};

export default SideMenu;
