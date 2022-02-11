import * as yup from "yup";
import { GROUP } from "../enums/tabs";

export const NewGroupValidation = yup.object({
  [GROUP.NAME]: yup.string().required("Name of group is required!"),
  [GROUP.ICON]: yup.string(),
  [GROUP.SHARE]: yup.boolean().oneOf([true, false]),
});
