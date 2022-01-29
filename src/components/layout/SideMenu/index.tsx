import React, { useEffect } from "react";
import { RecoilState, useRecoilState, useRecoilValue } from "recoil";
import SearchField from "../../ui/Search";
import Actions from "./components";
import generateTree from "../../ui/Tree/render/tree";
import { CachedTreeType } from "../../../utilities/types/tree.type";
import axios from "axios";
import ReceiveToken from "../../../services/LocalStorage/jwt/receive-token";
import { List } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import DeckIcon from "@mui/icons-material/Deck";
import WorkIcon from "@mui/icons-material/Work";
import ListRow from "./ListRow";

const SideMenu: React.FC<{ atom: RecoilState<any>[] }> = ({ atom }) => {
  const managerVisibility = useRecoilValue(atom[0]);
  const [{ tree, flat, groups, selected }, setCache] = useRecoilState<CachedTreeType>(atom[1]);
  const token = ReceiveToken();

  useEffect(() => {
    axios.get("/records/one", { headers: { ["x-access-token"]: token } }).then((res) => {
      return setCache((prev) => {
        return {
          ...prev,
          flat: res.data,
        };
      });
    });
  }, []);
  useEffect(() => {
    setCache((prev) => {
      return {
        ...prev,
        tree: generateTree(prev.flat, 0),
      };
    });
  }, [flat]);

  const marks: { label: string; icon: JSX.Element; defaultOpen?: boolean }[] = [
    {
      label: "Personal",
      icon: <DeckIcon />,
      defaultOpen: true,
    },
    {
      label: "School",
      icon: <SchoolIcon />,
    },
    {
      label: "Work",
      icon: <WorkIcon />,
    },
  ];

  useEffect(() => {
    axios.get(`group`, { headers: { ["x-access-token"]: token } }).then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
    <div className={`side-menu ${managerVisibility ? "active" : ""}`}>
      <SearchField atom={atom[1]} placeholder={"Search..."} />
      <Actions atom={atom[1]} />
      <div className={"side-menu_list"}>
        <List dense={true} component="nav" aria-labelledby="nested-list-subheader">
          <ListRow groupData={groups} selectedSetter={setCache} treeData={tree} />
        </List>
      </div>
    </div>
  );
};

export default SideMenu;
