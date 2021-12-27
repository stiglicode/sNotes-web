import * as yup from "yup";
import { AUTH } from "../enums/authentication.enum";

const signup = yup.object({
  [AUTH.NICKNAME]: yup.string().required("Nickname is required"),
  [AUTH.FIRSTNAME]: yup.string().required("First name is required"),
  [AUTH.LASTNAME]: yup.string().required("Last name is required"),
  [AUTH.PASSWORD]: yup.string().min(8, "Password is too short").required("Password is required"),
  [AUTH.EMAIL]: yup.string().email("Invalid email address format").required("Email is required"),
  [AUTH.CONFIRM_PASSWORD]: yup
    .string()
    .min(6, "Password is too short")
    .required("Password is required")
    .oneOf([yup.ref(AUTH.PASSWORD), null], "Passwords must match"),
});

const signin = yup.object({
  [AUTH.PASSWORD]: yup.string().min(8, "Password is too short").required("Password is required"),
  [AUTH.EMAIL]: yup.string().email("Invalid email address format").required("Email is required"),
});

export const AuthValidation = {
  signup,
  signin,
};
