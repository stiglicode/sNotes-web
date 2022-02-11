import React from "react";
import { ITabs } from "../../../../../../utilities/types/tab.type";
import NewGroup from "./Actions/NewGroup";
import PendingGroups from "./Actions/PendingGroups";
import { PropsAndAtom } from "../../../../../../utilities/types/atom.type";
import ActiveGroups from "./Actions/ActiveGroups";
import { Navigate } from "react-router-dom";

const Group: PropsAndAtom<any, ITabs> = ({ params, atom }) => {
  switch (params.action) {
    case "new":
      return <NewGroup atom={atom} />;
    case "pending":
      return <PendingGroups atom={atom} />;
    case "active":
      return <ActiveGroups atom={atom} />;
    default:
      return <Navigate to={`${params.tab}/active`} />;
  }
};

export default Group;
