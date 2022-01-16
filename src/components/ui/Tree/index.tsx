import React from "react";
import { ChevronRight, ExpandMore } from "@mui/icons-material";
import { TreeView } from "@mui/lab";
import RenderItem from "./render/item";
import { TreeCallbackItemType, TreeItemType } from "../../../utilities/types/tree.type";

const Tree: React.FC<{ data: TreeItemType[]; selected: (cb: TreeCallbackItemType) => any }> = ({ data, selected }) => {
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMore className={"tree-collapse-icons"} />}
      defaultExpandIcon={<ChevronRight className={"tree-collapse-icons"} />}
      className={"tree"}
    >
      {RenderItem(data, selected)}
    </TreeView>
  );
};

export default Tree;
