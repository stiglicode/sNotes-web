import { atom } from "recoil";
import { AUTH } from "../../../utilities/enums/authentication.enum";
import { ICachedStoreAtom, ISettingsAtom, IUserDetails } from "../../../utilities/types/atom.type";
import { IGroup, TreeCallbackItemType } from "../../../utilities/types/tree.type";

export const UserDetailsAtom = atom<IUserDetails>({
  key: "UserDetailsAtom",
  default: {
    [AUTH.NICKNAME]: "",
    [AUTH.FIRSTNAME]: "",
    [AUTH.LASTNAME]: "",
    [AUTH.EMAIL]: "",
    [AUTH.PERMISSION]: 0,
  },
});

export const CacheStoreAtom = atom<ICachedStoreAtom>({
  key: "CacheStoreAtom",
  default: {
    flat: [],
    tree: [],
    groups: [],
    selected: {} as TreeCallbackItemType,
    selectedGroup: {} as IGroup,
    updateGroups: true,
  },
});

export const SettingsAtom = atom<ISettingsAtom>({
  key: "SettingsAtom",
  default: {
    __token: {
      expireIn: 0,
      createdAt: 0,
    },
    managerOpenStatus: true,
    notifications: {
      type: [],
      count: 0,
      updated: true,
    },
  },
});
