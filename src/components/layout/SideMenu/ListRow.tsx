import React, { FC, Fragment, useState } from "react";
import { Collapse, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Tree from "../../ui/Tree";
import { CachedTreeType, IGroup, TreeItemType } from "../../../utilities/types/tree.type";
import { SetterOrUpdater } from "recoil";

interface Props {
  groupData: IGroup;
  treeData: TreeItemType[];
  selectedSetter: SetterOrUpdater<CachedTreeType>;
}

const ListRow: FC<Props> = ({ groupData, treeData, selectedSetter }) => {
  const [open, setOpen] = useState(groupData?.defaultOpen);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Fragment>
      <ListItemButton onClick={handleClick} className={"side-menu_list--group"}>
        <ListItemIcon className={"side-menu_list--group-icon"}>{groupData.icon}</ListItemIcon>
        <ListItemText primary={groupData.name} />
        {open ? (
          <ExpandLess className={"side-menu_list--group-expand"} />
        ) : (
          <ExpandMore className={"side-menu_list--group-expand"} />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Tree
          data={treeData}
          selected={(data) => {
            selectedSetter((prev) => ({
              ...prev,
              selected: data,
            }));
          }}
        />
      </Collapse>
    </Fragment>
  );
};

export default ListRow;
