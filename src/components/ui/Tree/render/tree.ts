import { FlatItemType, TreeItemType } from "../../../../utilities/types/tree.type";

const generateTree = (data: FlatItemType[], parentId: number, flatTree = false): TreeItemType[] => {
  if (flatTree) {
    const result: TreeItemType[] = [];
    data.map((record) => {
      return result.push({
        id: record._id,
        parent: record.parent,
        child_id: record.id,
        name: record.title,
        children: [],
        type: record.type,
        detail_id: record.detail_id,
      });
    });
    return result;
  } else {
    return data
      .filter((record) => record.parent === parentId)
      .reduce((tree: TreeItemType[], record: FlatItemType) => {
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
  }
};

export default generateTree;
