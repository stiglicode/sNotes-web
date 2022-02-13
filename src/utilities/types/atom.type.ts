import { FlatItemType, IGroup, TreeCallbackItemType, TreeItemType } from "./tree.type";
import { AUTH } from "../enums/authentication.enum";
import { RecoilState } from "recoil";
import React from "react";

export interface ICachedStoreAtom {
  flat: FlatItemType[];
  tree: TreeItemType[];
  groups: IGroup[];
  selected: TreeCallbackItemType;
  selectedGroup: IGroup;
  updateGroups: boolean;
}

export interface INotification {
  count: number;
  type: string[];
  updated: boolean;
}

export interface ISettingsAtom {
  __token: {
    expireIn: number;
    createdAt: number;
  };
  managerOpenStatus: boolean;
  notifications: INotification;
}

export interface IUserDetails {
  [AUTH.NICKNAME]: string;
  [AUTH.FIRSTNAME]: string;
  [AUTH.LASTNAME]: string;
  [AUTH.EMAIL]: string;
  [AUTH.PERMISSION]: number;
  id: string;
}

export type IAtom<A> = {
  atom: RecoilState<A>[];
};

export type PropsAndAtom<
  A extends object = Record<string, unknown>,
  P extends object = Record<string, unknown>
> = React.FC<IAtom<A> & P>;
