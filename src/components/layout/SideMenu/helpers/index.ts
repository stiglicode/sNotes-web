import React from "react";
import axios from "axios";
import { FlatItemType, IGroup, TreeCallbackItemType, TreeItemType } from "../../../../utilities/types/tree.type";
import { SetterOrUpdater } from "recoil";

export const createEvent = (
  type: string,
  ref: React.RefObject<HTMLInputElement>,
  set: SetterOrUpdater<{
    flat: FlatItemType[];
    tree: TreeItemType[];
    groups: IGroup[];
    selected: TreeCallbackItemType;
    selectedGroup: IGroup;
    updateGroups: boolean;
  }>,
  selected: TreeCallbackItemType
) => {
  const value = ref?.current?.value;
  return axios
    .post("records/all", {
      title: value,
      type: type,
      parent: selected?.type ? (selected?.type === "folder" ? selected?.child_id : selected?.parent) : 0,
    })
    .then((res) => {
      return set((prev) => {
        return {
          ...prev,
          flat: [...prev.flat, res.data],
        };
      });
    });
};
export const updateEvent = (
  type: string,
  newValue: string,
  _id: string,
  set: SetterOrUpdater<{
    flat: FlatItemType[];
    tree: TreeItemType[];
    groups: IGroup[];
    selected: TreeCallbackItemType;
    selectedGroup: IGroup;
    updateGroups: boolean;
  }>
) => {
  return axios
    .put(`records/${_id}`, {
      title: newValue,
    })
    .then((res) => {
      return set((prev) => {
        let copyOfSelected = { ...prev.selected };

        copyOfSelected = {
          ...copyOfSelected,
          name: res?.data?.title,
        };

        return { ...prev, selected: { ...copyOfSelected } };
      });
    });
};

export const deleteEvent = (
  id: number,
  record: string,
  record_detail: string,
  set: SetterOrUpdater<{
    flat: FlatItemType[];
    tree: TreeItemType[];
    groups: IGroup[];
    selected: TreeCallbackItemType;
    selectedGroup: IGroup;
    updateGroups: boolean;
  }>
) => {
  return axios.delete(`records/${id}/${record}/${record_detail}`).then((res) => {
    if (res?.data?.isDeleted) {
      return set((prev) => {
        const copyOfFlat = [...prev.flat];

        const deleted = copyOfFlat.filter((item) => item?._id !== res.data.record_id);
        return {
          ...prev,
          flat: deleted,
        };
      });
    } else {
      console.log(res?.data);
    }
  });
};
