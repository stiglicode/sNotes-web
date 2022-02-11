import { GROUP } from "../enums/tabs";
import { IPermissions } from "./authentication.type";
import { GroupIconsName } from "./group-icon.type";
import { Params } from "react-router-dom";

export interface ITabs {
  params: Readonly<Params<string>>;
}

export interface INewGroup {
  [GROUP.NAME]: string;
  [GROUP.SHARE]: boolean;
  [GROUP.ICON]: string;
}

export interface IPendingGroups {
  groupName: string;
  contributorID: string;
  addBy: string;
  groupIcon: GroupIconsName;
  groupPermission: IPermissions;
  pendingCreateAt: Date;
  groupPending: boolean;
}
