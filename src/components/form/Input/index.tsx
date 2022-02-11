import React from "react";
import { TextField } from "@mui/material";
import { FormikProps } from "formik";

interface FormInputProps {
  label?: string;
  name: string;
  form: FormikProps<any>;
  type?: "text" | "email" | "password" | "number";
  err?: string;
  autoFocus?: boolean;
  variant?: "standard" | "outlined" | "filled" | undefined;
}

const FormInput = ({ label, name, form, type, err = "", autoFocus = false, variant = "outlined" }: FormInputProps) => {
  return (
    <TextField
      label={label}
      name={name}
      value={form?.values[name]}
      onChange={form?.handleChange}
      type={type}
      size={"small"}
      variant={variant}
      error={err !== "" ? Boolean(err) : form.touched[name] && Boolean(form.errors[name])}
      helperText={err !== "" ? err : form.touched[name] && form.errors[name]}
      autoFocus={autoFocus}
    />
  );
};

export default FormInput;
