import React from "react";
import GroupBox from "../../../../../../../ui/Settings/Group";
import { IUserDetails, PropsAndAtom } from "../../../../../../../../utilities/types/atom.type";
import { useRecoilState, useRecoilValue } from "recoil";
import { CachedTreeType } from "../../../../../../../../utilities/types/tree.type";
import ActiveGroupListItem from "./Item";

const ActiveGroups: PropsAndAtom<any> = ({ atom }) => {
  const [{ groups }, updateGroup] = useRecoilState<CachedTreeType>(atom[0]);
  const loggedUserId = useRecoilValue<IUserDetails>(atom[2]);
  const owenGroups = groups.filter((group) => group.isAuthor);
  const nonOwenGroups = groups.filter((group) => !group.isAuthor);
  return (
    <div>
      <GroupBox title={"Your groups"}>
        <div className={"active-group_list"}>
          {owenGroups.map((group, key) => {
            return (
              <ActiveGroupListItem
                key={key}
                data={group}
                loggedUserId={loggedUserId.id}
                defaultOpen={key === 0}
                isAuthor={group.isAuthor}
              />
            );
          })}
        </div>
      </GroupBox>
      <GroupBox title={"Groups"}>
        <div className={"active-group_list"}>
          {nonOwenGroups.map((group, key) => {
            return (
              <ActiveGroupListItem
                key={key}
                data={group}
                loggedUserId={loggedUserId.id}
                defaultOpen={key === 0}
                isAuthor={group.isAuthor}
              />
            );
          })}
        </div>
      </GroupBox>
    </div>
  );
};

export default ActiveGroups;
