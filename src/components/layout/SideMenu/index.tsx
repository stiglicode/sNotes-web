import React, { useEffect } from "react";
import { RecoilState, useRecoilState, useRecoilValue } from "recoil";
import SearchField from "../../ui/Search";
import Actions from "./components";
import generateTree from "../../ui/Tree/render/tree";
import { CachedTreeType } from "../../../utilities/types/tree.type";
import axios from "axios";
import ReceiveToken from "../../../services/LocalStorage/jwt/receive-token";
import { List } from "@mui/material";
import ListRow from "./ListRow";

const SideMenu: React.FC<{ atom: RecoilState<any>[] }> = ({ atom }) => {
  const { managerOpenStatus } = useRecoilValue(atom[0]);
  const [{ tree, flat, groups, updateGroups }, setCache] = useRecoilState<CachedTreeType>(atom[1]);
  const token = ReceiveToken();

  useEffect(() => {
    axios.get("/records/one").then((res) => {
      return setCache((prev) => {
        return {
          ...prev,
          flat: res.data,
        };
      });
    });
    if (updateGroups) {
      axios.get(`groups`).then((res) => {
        return setCache((prev) => ({
          ...prev,
          groups: res.data.map((group: any) => {
            return {
              id: "null",
              name: group.groupName,
              shareable: group.groupShareable,
              permanent: group.groupPermanent,
              author: group.groupAuthor,
              icon: group.groupIcon,
              defaultOpen: group.defaultOpen,
              users: group.groupContributors.map((contributor: string) => {
                return { name: contributor };
              }),
            };
          }),
          updateGroups: false,
        }));
      });
    }
  }, [updateGroups]);

  useEffect(() => {
    setCache((prev) => {
      return {
        ...prev,
        tree: generateTree(prev.flat, 0),
      };
    });
  }, [flat]);

  return (
    <div className={`side-menu ${managerOpenStatus ? "active" : ""}`}>
      <SearchField atom={atom[1]} placeholder={"Search..."} />
      <Actions atom={atom[1]} />
      <div className={"side-menu_list"}>
        <List dense={true} component="nav" aria-labelledby="nested-list-subheader">
          {groups.map((group, key) => {
            return <ListRow key={key} groupData={group} selectedSetter={setCache} treeData={tree} />;
          })}
        </List>
      </div>
    </div>
  );
};

export default SideMenu;
