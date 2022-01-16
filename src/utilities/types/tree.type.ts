export interface TreeItemType {
  id: string;
  parent: number | null;
  child_id: number;
  name: string;
  children: TreeItemType[] | [];
  type: "file" | "folder";
  detail_id: string;
}

export interface FlatItemType {
  id: number;
  _id: string;
  parent: number | null;
  child_id: number;
  name: string;
  type: "file" | "folder";
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
  selected: TreeCallbackItemType;
}
