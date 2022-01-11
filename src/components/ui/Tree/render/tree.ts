import { FlatItemType, TreeItemType } from "../../../../utilities/types/tree.type";

const generateTree = (data: FlatItemType[], parentId: number | null): TreeItemType[] => {
  return data
    .filter((record) => record.parent === parentId)
    .reduce((tree: any, record: any) => {
      return [
        ...tree,
        {
          parent: record.parent,
          id: record.id,
          name: record.title,
          children: generateTree(data, record.id),
          type: record.type,
        },
      ];
    }, []);
};

export default generateTree;
