import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import FormInput from "../../../components/form/Input";
import { AUTH } from "../../../utilities/enums/authentication.enum";
import { useFormik } from "formik";
import { AuthValidation } from "../../../utilities/validation/authntication.validation";
import { SigninType } from "../../../utilities/types/authentication.type";
import axios from "axios";
import SaveToken from "../../../services/LocalStorage/jwt/save-token";

const Signin = () => {
  const [sse, setSSE] = useState({
    [AUTH.PASSWORD]: "",
    [AUTH.EMAIL]: "",
  });

  const handleSubmit = (values: SigninType) => {
    return axios
      .post("/auth/login", {
        [AUTH.PASSWORD]: values[AUTH.PASSWORD],
        [AUTH.EMAIL]: values[AUTH.EMAIL],
      })
      .then((res) => {
        if (res?.data?.status === 200) {
          return SaveToken(res?.data?.token);
        } else {
          if (res?.data?.error === "e-p") {
            return setSSE({
              [AUTH.EMAIL]: "",
              [AUTH.PASSWORD]: res?.data?.message,
            });
          } else if (res?.data?.error === "e-e") {
            return setSSE({
              [AUTH.PASSWORD]: "",
              [AUTH.EMAIL]: res?.data?.message,
            });
          } else {
            return setSSE({
              [AUTH.PASSWORD]: "",
              [AUTH.EMAIL]: "",
            });
          }
        }
      });
  };

  const formik = useFormik({
    initialValues: {
      [AUTH.PASSWORD]: "",
      [AUTH.EMAIL]: "",
    },
    validationSchema: AuthValidation.signin,
    onSubmit: handleSubmit,
  });

  return (
    <Box component={"div"} className={"account-wrapper"}>
      <Box component={"form"} onSubmit={formik.handleSubmit} className={"account-form"} autoComplete="off">
        <Box className={"account-form--head"}>
          <h1>Sign in</h1>
        </Box>
        <Box className={"account-form--body"}>
          <FormInput label={"Email address"} name={AUTH.EMAIL} type={"email"} form={formik} err={sse[AUTH.EMAIL]} />
          <FormInput label={"Password"} name={AUTH.PASSWORD} type={"password"} form={formik} err={sse[AUTH.PASSWORD]} />
        </Box>
        <Box className={"account-form--footer"}>
          <Button type={"submit"} variant={"outlined"} sx={{ width: "100%" }}>
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Signin;
