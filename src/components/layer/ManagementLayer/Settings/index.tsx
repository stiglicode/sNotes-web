import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import Modal from "../../../ui/Modal";
import { Box, Tab, Tabs } from "@mui/material";
import { TabBody } from "./Tabs";
import { TAB } from "../../../../utilities/enums/tabs";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRecoilValue } from "recoil";
import { ISettingsAtom, PropsAndAtom } from "../../../../utilities/types/atom.type";
import { IModalList } from "../../../../utilities/types/modal.type";
import { AddBox, FiberNew, Groups } from "@mui/icons-material";

const Settings: PropsAndAtom<any> = ({ atom }) => {
  // const params = useParams();
  const { notifications } = useRecoilValue<ISettingsAtom>(atom[1]);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (!params.tab) return setValue(0);
  }, [params]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const setTabPath = (path: string, divider = true) => {
    if (!divider) {
      return navigate(`/settings/${path}`, { replace: true });
    } else {
      return navigate(`/settings${path}`, { replace: true });
    }
  };

  const modalListItems = (): IModalList[] | [] => {
    switch (value) {
      case 0:
        return [];
      case 1:
        return [];
      case 2:
        return [
          {
            icon: <AddBox />,
            label: "New group",
            target: "new",
            notifications: 0,
          },
          {
            icon: <FiberNew />,
            label: "Pending groups",
            target: "pending",
            notifications: notifications.count,
          },
          {
            icon: <Groups />,
            label: "Active groups",
            target: "active",
            notifications: 0,
          },
        ];
      case 3:
        return [];
      default:
        return [];
    }
  };

  const SettingsTabs = () => {
    switch (params.tab) {
      case TAB.FIRST:
        setValue(1);
        return <></>;
      case TAB.SECOND:
        setValue(2);
        return <TabBody.Group params={params} atom={atom} />;
      case TAB.THIRD:
        setValue(3);
        return <></>;
      default:
        setValue(0);
        return <></>;
    }
  };

  return (
    <Routes>
      <Route
        path={"/settings/*"}
        element={
          <Modal
            body={
              <Box>
                <SettingsTabs />
              </Box>
            }
            closeText={"Dismis"}
            label={
              <Box>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label={<SettingsIcon />} onClick={() => setTabPath("")} style={{ minWidth: "fit-content" }} />
                  <Tab
                    label={
                      <div
                        className={`${
                          notifications.count > 0 && notifications.type.find((type) => type === "new-groups")
                            ? "notification"
                            : ""
                        }`}
                      >
                        {notifications.count > 0 && notifications.type.find((type) => type === "new-groups") ? (
                          <span className={"notification-count"}>{notifications.count}</span>
                        ) : (
                          <></>
                        )}
                        <strong>{TAB.FIRST}</strong>
                      </div>
                    }
                    onClick={() => setTabPath(TAB.FIRST, false)}
                  />
                  <Tab
                    label={
                      <div
                        className={`${
                          notifications.count > 0 && notifications.type.find((type) => type === "new-group")
                            ? "notification"
                            : ""
                        }`}
                      >
                        {notifications.count > 0 && notifications.type.find((type: string) => type === "new-group") ? (
                          <span className={"notification-count"}>{notifications.count}</span>
                        ) : (
                          <></>
                        )}
                        <strong>{TAB.SECOND}</strong>
                      </div>
                    }
                    onClick={() => setTabPath(TAB.SECOND, false)}
                  />
                  <Tab
                    label={
                      <div
                        className={`${
                          notifications.count > 0 && notifications.type.find((type) => type === "new-groups")
                            ? "notification"
                            : ""
                        }`}
                      >
                        {notifications.count > 0 && notifications.type.find((type) => type === "new-groups") ? (
                          <span className={"notification-count"}>{notifications.count}</span>
                        ) : (
                          <></>
                        )}
                        <strong>{TAB.THIRD}</strong>
                      </div>
                    }
                    onClick={() => setTabPath(TAB.THIRD, false)}
                  />
                </Tabs>
              </Box>
            }
            headPadding={false}
            width={1000}
            list={modalListItems()}
          />
        }
      />
    </Routes>
  );
};

export default Settings;
