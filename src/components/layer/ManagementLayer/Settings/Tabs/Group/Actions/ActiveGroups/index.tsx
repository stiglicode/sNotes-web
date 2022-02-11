import React from "react";
import GroupBox from "../../../../../../../ui/Settings/Group";
import { PropsAndAtom } from "../../../../../../../../utilities/types/atom.type";
import { useRecoilState } from "recoil";
import { CachedTreeType } from "../../../../../../../../utilities/types/tree.type";
import ActiveGroupListItem from "./Item";

const ActiveGroups: PropsAndAtom<any> = ({ atom }) => {
  const [{ groups }, updateGroup] = useRecoilState<CachedTreeType>(atom[0]);
  console.log(groups);
  return (
    <div>
      <GroupBox title={"Your groups"}>
        <div className={"active-group_list"}>
          {groups.map((group, key) => {
            return <ActiveGroupListItem key={key} data={group} />;
          })}
        </div>
      </GroupBox>
      <GroupBox title={"Groups"}>j</GroupBox>
    </div>
  );
};

export default ActiveGroups;
