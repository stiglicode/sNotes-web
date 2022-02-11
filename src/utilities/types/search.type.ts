import { IPermissions } from "./authentication.type";

export interface IFoundUsers {
  id: string;
  nickname: string;
  firstname: string;
  lastname: string;
  permission?: IPermissions;
}
