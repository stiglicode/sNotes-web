import React, { useEffect } from "react";
import SideMenu from "../../layout/SideMenu";
import { useRecoilState, useRecoilValue } from "recoil";
import ProfileManager from "../../layout/ProfileManager";
import { ICachedStoreAtom, ISettingsAtom, PropsAndAtom } from "../../../utilities/types/atom.type";
import axios from "axios";

const ManagementLayer: PropsAndAtom<any> = ({ atom }) => {
  const [{ managerOpenStatus, notifications }, updateSettings] = useRecoilState<ISettingsAtom>(atom[0]);
  const { selected } = useRecoilValue<ICachedStoreAtom>(atom[2]);

  useEffect(() => {
    if (notifications.updated) {
      axios.get("/notification").then((res) => {
        updateSettings((prev) => ({
          ...prev,
          notifications: {
            updated: false,
            type: res.data.type,
            count: res.data.count,
          },
        }));
      });
    }
  }, [notifications]);

  return (
    <div className={`layer ${managerOpenStatus ? "active" : ""} management-layer`}>
      <SideMenu atom={[atom[0], atom[2]]} />
      <span className={`management-layer_file-name ${managerOpenStatus ? "active" : ""}`}>
        {selected?.type === "file" ? selected?.name : ""}
      </span>
      <ProfileManager atom={[atom[0], atom[1]]} />
    </div>
  );
};

export default ManagementLayer;
