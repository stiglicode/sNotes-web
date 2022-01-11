export type TreeItemType = {
  parent: number | null;
  id: number;
  name: string;
  children: TreeItemType[] | [];
  type: "file" | "folder";
};

export type FlatItemType = {
  parent: number | null;
  id: number;
  name: string;
  type: "file" | "folder";
};

export type TreeCallbackItemType = {
  parent: number | null;
  id: number;
  name: string;
  children: boolean;
  type: "file" | "folder";
};

export type CachedTreeType = {
  flat: FlatItemType[];
  tree: TreeItemType[];
  selected: TreeCallbackItemType;
};
