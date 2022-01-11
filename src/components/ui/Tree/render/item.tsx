import React, { useState } from "react";
import { TreeCallbackItemType, TreeItemType } from "../../../../utilities/types/tree.type";
import { TreeItem } from "@mui/lab";
import { Delete, DisabledByDefault, Edit, Folder, InsertDriveFile } from "@mui/icons-material";

const RenderItem = (data: TreeItemType[], onSelect: (callBack: TreeCallbackItemType) => any) => {
  const render = (node: TreeItemType[]) => {
    return node?.map((rootNode, index) => {
      const [editable, setEditable] = useState(true);
      return (
        <TreeItem
          key={index}
          nodeId={String(rootNode.id)}
          onClick={() => {
            return onSelect({
              id: rootNode.id,
              parent: rootNode.parent,
              type: rootNode.type,
              name: rootNode.name,
              children: !!rootNode.children.length,
            });
          }}
          label={
            <div className={"tree-rendered-item"}>
              <div className={"tree-rendered-item_box left"}>
                {rootNode.type === "file" ? <InsertDriveFile /> : rootNode.type === "folder" ? <Folder /> : <></>}
                <input defaultValue={rootNode.name} disabled={editable} type={"text"} />
              </div>
              <div className={"tree-rendered-item_box right"}>
                <label className={"pop-up"} onClick={() => setEditable(!editable)}>
                  {!editable ? <DisabledByDefault /> : <Edit />}
                </label>
                <label className={"delete pop-up"}>
                  <Delete />
                </label>
              </div>
            </div>
          }
        >
          {render(rootNode?.children)}
        </TreeItem>
      );
    });
  };
  return render(data);
};

export default RenderItem;
