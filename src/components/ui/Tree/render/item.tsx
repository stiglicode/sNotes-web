import React, { FC, useState } from "react";
import { TreeCallbackItemType, TreeItemType } from "../../../../utilities/types/tree.type";
import { TreeItem } from "@mui/lab";
import { Delete, DisabledByDefault, Edit, Folder, InsertDriveFile } from "@mui/icons-material";

interface ItemProps {
  node: TreeItemType;
  index: number;
  onSelect: (callBack: TreeCallbackItemType) => void;
  self: (node: TreeItemType[]) => JSX.Element[];
}

const Item: FC<ItemProps> = ({ node, index, onSelect, self }) => {
  const [editable, setEditable] = useState(true);

  return (
    <TreeItem
      key={index}
      nodeId={String(node.id)}
      onClick={() => {
        return onSelect({
          id: node.id,
          parent: node.parent,
          type: node.type,
          name: node.name,
          children: !!node.children.length,
        });
      }}
      label={
        <div className={"tree-rendered-item"}>
          <div className={"tree-rendered-item_box left"}>
            {node.type === "file" ? <InsertDriveFile /> : node.type === "folder" ? <Folder /> : <></>}
            <input defaultValue={node.name} disabled={editable} type={"text"} />
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
      {self(node?.children)}
    </TreeItem>
  );
};

const RenderItem = (data: TreeItemType[], onSelect: (callBack: TreeCallbackItemType) => void) => {
  const render = (node: TreeItemType[]) => {
    return node?.map((rootNode, index) => {
      return <Item key={index} node={rootNode} index={index} onSelect={onSelect} self={render} />;
    });
  };
  return render(data);
};

export default RenderItem;
