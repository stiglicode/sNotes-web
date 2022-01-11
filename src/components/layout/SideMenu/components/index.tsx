import React, { useState } from "react";
import { CreateNewFolder, NoteAdd } from "@mui/icons-material";

const Actions = () => {
  const [isFocused, setFocus] = useState([false, false]);
  return (
    <div className={"side-menu_actions"}>
      <div className={`side-menu_actions--box ${isFocused[0] ? "focused" : ""}`}>
        <button className={"side-menu_actions--box-button pop-up"} aria-label={"add-button"}>
          <NoteAdd />
        </button>
        <input
          className={"side-menu_actions--box-input"}
          type={"text"}
          onFocus={() => setFocus([true, false])}
          onBlur={() => setFocus([false, false])}
          placeholder={"File name..."}
        />
      </div>
      <div className={`side-menu_actions--box ${isFocused[1] ? "focused" : ""}`}>
        <button className={"side-menu_actions--box-button pop-up"} aria-label={"add-button"}>
          <CreateNewFolder />
        </button>
        <input
          className={"side-menu_actions--box-input"}
          type={"text"}
          onFocus={() => setFocus([false, true])}
          onBlur={() => setFocus([false, false])}
          placeholder={"Folder name..."}
        />
      </div>
    </div>
  );
};

export default Actions;
