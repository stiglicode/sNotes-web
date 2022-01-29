import { atom } from "recoil";
import { AUTH } from "../../../utilities/enums/authentication.enum";
import { FlatItemType, IGroup, TreeCallbackItemType, TreeItemType } from "../../../utilities/types/tree.type";

export const ManagerOpenStateAtom = atom({
  key: "ManagerOpenStateAtom",
  default: false as boolean,
});

export const UserDetailsAtom = atom({
  key: "UserDetailsAtom",
  default: {
    [AUTH.NICKNAME]: "" as string,
    [AUTH.FIRSTNAME]: "" as string,
    [AUTH.LASTNAME]: "" as string,
    [AUTH.EMAIL]: "" as string,
    [AUTH.PERMISSION]: 0 as number,
  },
});

export const CacheStoreAtom = atom({
  key: "CacheStoreAtom",
  default: {
    flat: [] as FlatItemType[],
    tree: [] as TreeItemType[],
    groups: [] as IGroup[],
    selected: {} as TreeCallbackItemType,
    selectedGroup: {} as IGroup,
  },
});

export const SettingsAtom = atom({
  key: "SettingsAtom",
  default: {
    __token: {
      expireIn: 0 as number,
      createdAt: 0 as number,
    },
  },
});
