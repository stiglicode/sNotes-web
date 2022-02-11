import React, { useRef, useState } from "react";
import { AddCircle, CreateNewFolder, NoteAdd } from "@mui/icons-material";
import { RecoilState, useRecoilState } from "recoil";
import { createEvent } from "../helpers";
import { ICachedStoreAtom } from "../../../../utilities/types/atom.type";
import { useNavigate } from "react-router-dom";

const Actions: React.FC<{ atom: RecoilState<ICachedStoreAtom> }> = ({ atom }) => {
  const [isFocused, setFocus] = useState([false, false, false]);
  const [{ selected }, setCache] = useRecoilState(atom);
  const fileRef = useRef<HTMLInputElement>(null);
  const folderRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>, create: () => Promise<void>) => {
    if (event.key === "Enter" || event.code === "Enter") {
      return create();
    }
  };

  const createNewFile = () => {
    return createEvent("file", fileRef, setCache, selected);
  };

  const createNewFolder = () => {
    return createEvent("folder", folderRef, setCache, selected);
  };

  const createNewGroup = () => {
    return navigate("/settings/group/new");
  };

  return (
    <div className={"side-menu_actions"}>
      <div className={"side-menu_actions--wrapper"}>
        <div className={`side-menu_actions--box ${isFocused[0] ? "focused" : ""}`}>
          <button className={"side-menu_actions--box-button pop-up"} aria-label={"add-button"} onClick={createNewFile}>
            <NoteAdd />
          </button>
          <input
            className={"side-menu_actions--box-input"}
            type={"text"}
            onFocus={() => setFocus([true, false])}
            onBlur={() => setFocus([false, false])}
            placeholder={"File name..."}
            ref={fileRef}
            onKeyDown={(event) => handleEnter(event, createNewFile)}
          />
        </div>
        <div className={`side-menu_actions--box ${isFocused[1] ? "focused" : ""}`}>
          <button
            className={"side-menu_actions--box-button pop-up"}
            aria-label={"add-button"}
            onClick={createNewFolder}
          >
            <CreateNewFolder />
          </button>
          <input
            className={"side-menu_actions--box-input"}
            type={"text"}
            onFocus={() => setFocus([false, true])}
            onBlur={() => setFocus([false, false])}
            placeholder={"Folder name..."}
            ref={folderRef}
            onKeyDown={(event) => handleEnter(event, createNewFolder)}
          />
        </div>
      </div>
      <div className={"side-menu_actions--box no-hover"}>
        <button className={"side-menu_actions--box-button pop-up"} aria-label={"add-button"} onClick={createNewGroup}>
          <AddCircle />
        </button>
      </div>
    </div>
  );
};

export default Actions;
