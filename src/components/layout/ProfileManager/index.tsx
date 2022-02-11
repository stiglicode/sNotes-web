import React, { useEffect, useState } from "react";
import { RecoilState, useRecoilValue } from "recoil";
import { AccountCircle, Logout, Settings } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import RemoveToken from "../../../services/LocalStorage/jwt/remove-token";
import ReceiveToken from "../../../services/LocalStorage/jwt/receive-token";
import { ISettingsAtom, IUserDetails } from "../../../utilities/types/atom.type";

const ProfileManager = ({ atom }: { atom: RecoilState<any>[] }) => {
  const { managerOpenStatus, notifications } = useRecoilValue<ISettingsAtom>(atom[0]);
  const { nickname } = useRecoilValue<IUserDetails>(atom[1]);

  const [loggedOut, setLogOut] = useState(false);

  useEffect((): any => {
    if (loggedOut && !ReceiveToken()) return (window.location.pathname = "/login");
  }, [loggedOut]);

  return (
    <div className={`profile-manager ${managerOpenStatus ? "active" : ""}`}>
      <Link className={"profile-manager_account"} to={"/account"}>
        <AccountCircle />
        <span>{nickname ? nickname : "Guest"}</span>
      </Link>
      <div className={"profile-manager_settings"}>
        <Link to={"/settings"}>
          <IconButton
            aria-label="settings"
            color={"primary"}
            className={`${notifications.count > 0 ? "notification" : ""}`}
          >
            {notifications.count > 0 ? (
              <span className={"notification-count w-padding"}>{notifications.count}</span>
            ) : (
              <></>
            )}
            <Settings />
          </IconButton>
        </Link>
        <IconButton
          aria-label="logout"
          color={"error"}
          onClick={() => {
            if (!loggedOut) {
              RemoveToken();
              return setLogOut(true);
            }
          }}
        >
          <Logout />
        </IconButton>
      </div>
    </div>
  );
};

export default ProfileManager;
