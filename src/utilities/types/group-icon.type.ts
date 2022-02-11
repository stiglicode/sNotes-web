import { ICON } from "../enums/group-icons.enum";

export type GroupIconsName =
  | ICON.PERSONAL
  | ICON.SCHOOL
  | ICON.WORK
  | ICON.BOOK
  | ICON.EMAIL
  | ICON.NOTE
  | ICON.DEFAULT;

export interface IGroupIconProps {
  name: GroupIconsName;
  className?: string;
}
