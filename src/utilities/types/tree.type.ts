export interface TreeItemType {
  parent: number | null;
  id: number;
  name: string;
  children: TreeItemType[] | [];
  type: "file" | "folder";
}

export interface FlatItemType {
  parent: number | null;
  id: number;
  name: string;
  type: "file" | "folder";
}

export interface TreeCallbackItemType {
  parent: number | null;
  id: number;
  name: string;
  children: boolean;
  type: "file" | "folder";
}

export interface CachedTreeType {
  flat: FlatItemType[];
  tree: TreeItemType[];
  selected: TreeCallbackItemType;
}
