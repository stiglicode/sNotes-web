import React from "react";
import { ErrorPageType } from "../../utilities/types/error-page.type";

const ErrorPage = ({statusCode, message}: ErrorPageType) => {
  return (
    <div>
      <h1>{statusCode}</h1>
      <strong>{message}</strong>
    </div>
  );
};

export default ErrorPage;