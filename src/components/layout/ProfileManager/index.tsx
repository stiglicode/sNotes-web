import React from "react";
import { RecoilState, useRecoilValue } from "recoil";

const ProfileManager = ({ atom }: { atom: RecoilState<boolean>[] }) => {
  const managerVisibility = useRecoilValue(atom[0]);

  return <div className={`profile-manager ${managerVisibility ? "active" : ""}`}>ProfileManager</div>;
};

export default ProfileManager;
