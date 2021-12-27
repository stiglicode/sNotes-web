import React from "react";
import { TextField } from "@mui/material";
import { FormikProps } from "formik";

interface FormInputProps {
  label?: string;
  name: string;
  form: FormikProps<any>;
  type?: "text" | "email" | "password" | "number";
  err?: string;
}

const FormInput = ({ label, name, form, type, err }: FormInputProps) => {
  return (
    <TextField
      label={label}
      name={name}
      value={form?.values[name]}
      onChange={form?.handleChange}
      type={type}
      size={"small"}
      error={err !== "" ? Boolean(err) : form.touched[name] && Boolean(form.errors[name])}
      helperText={err !== "" ? err : form.touched[name] && form.errors[name]}
    />
  );
};

export default FormInput;
