import { FlatItemType, TreeItemType } from "../../../../utilities/types/tree.type";

const generateTree = (data: FlatItemType[], parentId: number | null): TreeItemType[] => {
  return data
    .filter((record) => record.parent === parentId)
    .reduce((tree: any, record: any) => {
      return [
        ...tree,
        {
          id: record._id,
          parent: record.parent,
          child_id: record.id,
          name: record.title,
          children: generateTree(data, record.id),
          type: record.type,
          detail_id: record.detail_id,
        },
      ];
    }, []);
};

export default generateTree;
