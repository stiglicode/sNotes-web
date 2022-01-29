import React, { useEffect, useState } from "react";
import { RecoilState, useRecoilValue } from "recoil";
import { AccountCircle, Logout, Settings } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import RemoveToken from "../../../services/LocalStorage/jwt/remove-token";
import ReceiveToken from "../../../services/LocalStorage/jwt/receive-token";

const ProfileManager = ({ atom }: { atom: RecoilState<any>[] }) => {
  const managerVisibility = useRecoilValue(atom[0]);
  const { nickname } = useRecoilValue(atom[1]);
  const navigate = useNavigate();

  const [loggedOut, setLogOut] = useState(false);

  useEffect((): any => {
    if (loggedOut && !ReceiveToken()) return navigate("/login", { replace: true });
  }, [loggedOut]);

  return (
    <div className={`profile-manager ${managerVisibility ? "active" : ""}`}>
      <Link className={"profile-manager_account"} to={"/account"}>
        <AccountCircle />
        <span>{nickname ? nickname : "Guest"}</span>
      </Link>
      <div className={"profile-manager_settings"}>
        <Link to={"/settings"}>
          <IconButton aria-label="settings" color={"primary"}>
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
