import React, { FC, Fragment } from "react";
import { Collapse, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Tree from "../../ui/Tree";
import { CachedTreeType, IGroup, TreeItemType } from "../../../utilities/types/tree.type";
import { SetterOrUpdater } from "recoil";

interface Props {
  groupData: IGroup[];
  treeData: TreeItemType[];
  selectedSetter: SetterOrUpdater<CachedTreeType>;
}

const ListRow: FC<Props> = ({ groupData, treeData, selectedSetter }) => {
  return (
    <>
      {groupData.map((group, key) => {
        const [open, setOpen] = React.useState(group?.defaultOpen);

        const handleClick = () => {
          setOpen(!open);
        };
        return (
          <Fragment key={key}>
            <ListItemButton onClick={handleClick} className={"side-menu_list--group"}>
              <ListItemIcon className={"side-menu_list--group-icon"}>{group.icon}</ListItemIcon>
              <ListItemText primary={group.name} />
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
      })}
    </>
  );
};

export default ListRow;
