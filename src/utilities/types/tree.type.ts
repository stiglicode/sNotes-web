import { GroupIconsName } from "./group-icon.type";

export interface TreeItemType {
  id: string;
  parent: number | null;
  child_id: number;
  name: string;
  children: TreeItemType[] | [];
  type: "file" | "folder";
  detail_id: string;
  group?: string;
}

export interface FlatItemType {
  id: number;
  _id: string;
  parent: number | null;
  child_id: number;
  title: string;
  type: "file" | "folder";
  detail_id: string;
  group?: string;
}

export interface TreeCallbackItemType {
  id: string;
  parent: number | null;
  child_id: number;
  name: string;
  children: boolean;
  type: "file" | "folder";
}

export interface CachedTreeType {
  flat: FlatItemType[];
  tree: TreeItemType[];
  groups: IGroup[];
  selected: TreeCallbackItemType;
  selectedGroup: IGroup;
  updateGroups: boolean;
}

export interface IGroupContributors {
  name: string;
  permission: string;
  since: string;
  id: string;
}

export interface IGroup {
  id: string;
  name: string;
  shareable: boolean;
  author: string;
  isAuthor: boolean;
  icon: GroupIconsName;
  defaultOpen: boolean;
  users: IGroupContributors[];
}
