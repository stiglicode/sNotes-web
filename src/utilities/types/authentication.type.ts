import { AUTH } from "../enums/authentication.enum";

export type SignupType = {
  [AUTH.NICKNAME]: string;
  [AUTH.FIRSTNAME]: string;
  [AUTH.LASTNAME]: string;
  [AUTH.PASSWORD]: string;
  [AUTH.EMAIL]: string;
};

export type SigninType = {
  [AUTH.EMAIL]: string;
  [AUTH.PASSWORD]: string;
};

export type IPermissions = "reader" | "writer";
