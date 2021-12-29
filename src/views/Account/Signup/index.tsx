import React, { useState } from "react";
import { useFormik } from "formik";

import { Box, Button } from "@mui/material";
import FormInput from "../../../components/form/Input";
import { AUTH } from "../../../utilities/enums/authentication.enum";
import { AuthValidation } from "../../../utilities/validation/authntication.validation";
import { SignupType } from "../../../utilities/types/authentication.type";
import axios from "axios";
import SaveToken from "../../../services/LocalStorage/jwt/save-token";
import useQuery from "../../../utilities/hooks/useQuery";
import { Navigate } from "react-router-dom";


const Signup = () => {
  const [sse, setSSE] = useState({
    [AUTH.EMAIL]: "",
  });
  const handleSubmit = (values: SignupType) => {
    axios
      .post("/auth/create-user", {
        [AUTH.NICKNAME]: values[AUTH.NICKNAME],
        [AUTH.FIRSTNAME]: values[AUTH.FIRSTNAME],
        [AUTH.LASTNAME]: values[AUTH.LASTNAME],
        [AUTH.PASSWORD]: values[AUTH.PASSWORD],
        [AUTH.EMAIL]: values[AUTH.EMAIL],
      })
      .then((res) => {
        if (res?.data?.status === 200) {
          return SaveToken(res?.data?.token);
        } else {
          if (res?.data?.error === "e-e") {
            return setSSE({
              [AUTH.EMAIL]: res?.data?.message,
            });
          } else {
            return setSSE({
              [AUTH.EMAIL]: "",
            });
          }
        }
      });
  };

  const formik = useFormik({
    initialValues: {
      [AUTH.NICKNAME]: "",
      [AUTH.FIRSTNAME]: "",
      [AUTH.LASTNAME]: "",
      [AUTH.PASSWORD]: "",
      [AUTH.EMAIL]: "",
      [AUTH.CONFIRM_PASSWORD]: "",
    },
    validationSchema: AuthValidation.signup,
    onSubmit: handleSubmit,
  });

  if(useQuery().get("enter") !== "allow") return <Navigate to={"/login"}/>

  return (
    <Box component={"div"} className={"account-wrapper"}>
      <Box component={"form"} onSubmit={formik.handleSubmit} className={"account-form"} autoComplete="off">
        <Box className={"account-form--head"}>
          <h1>Sign up</h1>
        </Box>
        <Box className={"account-form--body"}>
          <Box component={"div"} className={"box-of-two"}>
            <FormInput label={"First name"} name={AUTH.FIRSTNAME} form={formik} />
            <FormInput label={"Last name"} name={AUTH.LASTNAME} form={formik} />
          </Box>

          <FormInput label={"Nickname"} name={AUTH.NICKNAME} form={formik} />
          <FormInput label={"Email address"} name={AUTH.EMAIL} type={"email"} form={formik} err={sse[AUTH.EMAIL]} />
          <FormInput label={"Password"} name={AUTH.PASSWORD} type={"password"} form={formik} />
          <FormInput label={"Re-password"} name={AUTH.CONFIRM_PASSWORD} type={"password"} form={formik} />
        </Box>
        <Box className={"account-form--footer"}>
          <Button type={"submit"} variant={"outlined"} sx={{ width: "100%" }}>
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
