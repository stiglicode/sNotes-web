import React, { FC, useEffect, useState } from "react";
import { TreeCallbackItemType, TreeItemType } from "../../../../utilities/types/tree.type";
import { TreeItem } from "@mui/lab";
import { Delete, DisabledByDefault, Edit, Folder, InsertDriveFile } from "@mui/icons-material";
import debounce from "../../../../utilities/debounce";
import { deleteEvent, updateEvent } from "../../../layout/SideMenu/helpers";
import { useSetRecoilState } from "recoil";
import { CacheStoreAtom } from "../../../../views/Main/recoil/MainAtom";

interface ItemProps {
  node: TreeItemType;
  index: number;
  onSelect: (callBack: TreeCallbackItemType) => void;
  self: (node: TreeItemType[]) => JSX.Element[];
}

const Item: FC<ItemProps> = ({ node, index, onSelect, self }) => {
  const [editable, setEditable] = useState(false);
  const [lastSaveState, setLastSaveState] = useState("");
  const [inputValue, setInputValue] = useState("");
  const updateCache = useSetRecoilState(CacheStoreAtom);

  const titleChangeHandler = debounce((event) => {
    const value = event?.target?.value;
    setInputValue(value);
    if (value !== "") {
      return updateEvent(node.type, value, node.id, updateCache);
    }
  }, 500);

  const handleSaveNewTitle = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.code === "Enter") {
      console.log(event);
      return setEditable(false);
    }
  };

  const handleRemove = () => {
    return deleteEvent(node?.child_id, node?.id, node?.detail_id, updateCache);
  };

  useEffect(() => {
    return setInputValue(node.name);
  }, []);

  return (
    <TreeItem
      key={index}
      nodeId={String(node.child_id)}
      onClick={() => {
        return onSelect({
          id: node.id,
          child_id: node.child_id,
          parent: node.parent,
          type: node.type,
          name: inputValue === "" ? lastSaveState : inputValue,
          children: !!node.children.length,
        });
      }}
      label={
        <div className={"tree-rendered-item"}>
          <div className={"tree-rendered-item_box left"}>
            {node.type === "file" ? <InsertDriveFile /> : node.type === "folder" ? <Folder /> : <></>}

            {editable ? (
              <input
                defaultValue={inputValue === "" ? lastSaveState : inputValue}
                type={"text"}
                onKeyDown={handleSaveNewTitle}
                onChange={titleChangeHandler}
              />
            ) : (
              <span>{inputValue === "" ? lastSaveState : inputValue}</span>
            )}
          </div>
          <div className={"tree-rendered-item_box right"}>
            <label
              className={"pop-up"}
              onClick={() => {
                setEditable(!editable);
                if (inputValue !== "") return setLastSaveState(inputValue);
              }}
            >
              {editable ? <DisabledByDefault /> : <Edit />}
            </label>
            <label className={"delete pop-up"} aria-label={"remove-button"} onClick={handleRemove}>
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
