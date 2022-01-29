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
}

export interface IGroup {
  id: string;
  name: string;
  shareable: boolean;
  author: string;
  icon: string;
  defaultOpen?: boolean;
  users?: {
    id: string;
    isAuthor: boolean;
  }[];
}
