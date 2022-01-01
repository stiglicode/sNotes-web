import { atom } from "recoil";
import { AUTH } from "../../../utilities/enums/authentication.enum";

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
