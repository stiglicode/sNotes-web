import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import GroupBox from "../../../../../../../ui/Settings/Group";
import { ICachedStoreAtom, ISettingsAtom, PropsAndAtom } from "../../../../../../../../utilities/types/atom.type";
import { IPendingGroups } from "../../../../../../../../utilities/types/tab.type";
import axios from "axios";
import GroupIcon from "../../../../../../../ui/GroupIcon";
import { Button, Tooltip } from "@mui/material";
import { Done } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const formattedDate = (date: string | Date) => {
  return `${new Date(date).getDate()}.${new Date(date).getMonth()}.${new Date(date).getFullYear()}`;
};

const PendingGroups: PropsAndAtom<any> = ({ atom }) => {
  const [{ notifications }, updatePending] = useRecoilState<ISettingsAtom>(atom[1]);
  const updateGroups = useSetRecoilState<ICachedStoreAtom>(atom[0]);
  const [pendingGroups, setPendingGroups] = useState<IPendingGroups[]>([]);
  const redirect = useNavigate();

  useEffect(() => {
    axios.get("/groups/pending").then((res) => {
      setPendingGroups(
        res.data.map((pendingGroup: IPendingGroups) => {
          return {
            groupName: pendingGroup.groupName,
            groupPending: pendingGroup.groupPending,
            contributorID: pendingGroup.contributorID,
            pendingCreateAt: pendingGroup.pendingCreateAt,
            addBy: pendingGroup.addBy,
            groupIcon: pendingGroup.groupIcon,
            groupPermission: pendingGroup.groupPermission,
          };
        })
      );
    });
    return () => {
      setPendingGroups([]);
    };
  }, []);

  const handleAccept = (id: string) => {
    console.log(id);
    axios.put(`/groups/pending/${id}`).then(() => {
      updatePending((prev) => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          updated: false,
          count: prev.notifications.count - 1,
        },
      }));
      updateGroups((prev: any) => ({ ...prev, updateGroups: true }));
      if (pendingGroups?.length <= 1) redirect("/");
    });
  };

  console.log(notifications);

  return (
    <GroupBox
      title={
        <div className={"pending-group_head"}>
          <span>New Groups</span>
          <span className={"pending-group_head--count"}>&nbsp;{notifications.count}</span>
        </div>
      }
    >
      <div className={"pending-group_list"}>
        {pendingGroups &&
          pendingGroups.map((group, key) => {
            return (
              <div key={key} className={"pending-group_list--item"}>
                <Tooltip title={group.groupName} arrow followCursor>
                  <div className={"pending-group_list--item-col"} style={{ justifyContent: "center" }}>
                    <span className={"pending-group_list--item-text"}>
                      <GroupIcon name={group.groupIcon} className={"pending-group_list--item-icon"} />
                      <span className={"pending-group_list--item-text_ellipsis"}>{group.groupName}</span>
                    </span>
                  </div>
                </Tooltip>
                <div className={"pending-group_list--item-col"}>
                  <span className={"pending-group_list--item-label"}>Permission:</span>
                  <span className={"pending-group_list--item-text"}>{group.groupPermission}</span>
                </div>
                <Tooltip title={group.addBy} arrow followCursor>
                  <div className={"pending-group_list--item-col"}>
                    <span className={"pending-group_list--item-label"}>Added by:</span>
                    <span className={"pending-group_list--item-text"} style={{ display: "inline" }}>
                      {group.addBy}
                    </span>
                  </div>
                </Tooltip>
                <div className={"pending-group_list--item-col"}>
                  <span className={"pending-group_list--item-label"}>Since:</span>
                  <span className={"pending-group_list--item-text"}>{formattedDate(group.pendingCreateAt)}</span>
                </div>
                <div
                  className={"pending-group_list--item-col"}
                  style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}
                >
                  <Button
                    startIcon={<Done />}
                    variant={"outlined"}
                    size={"small"}
                    onClick={() => {
                      handleAccept(group.contributorID);
                    }}
                  >
                    accept
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
    </GroupBox>
  );
};

export default PendingGroups;
