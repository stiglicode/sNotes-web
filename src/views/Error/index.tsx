import React from "react";
import { ErrorPageType } from "../../utilities/types/error-page.type";
import { Button } from "@mui/material";
import { Home } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ErrorPage = ({ statusCode, message, home, additionalMessage }: ErrorPageType) => {
  return (
    <div className={"error-page"}>
      <div className={"error-page_box"}>
        <div className={"error-page_box--message"}>
          <span>{message}</span>
        </div>
        <div className={"error-page_box--code"}>
          <span>{statusCode}</span>
        </div>
        {home ? (
          <div className={"error-page_box--return"}>
            <Button variant="contained">
              <Link to={"/"}>
                <Home />
                <span>Home</span>
              </Link>
            </Button>
          </div>
        ) : (
          <></>
        )}
        {additionalMessage ? (
          <div className={"error-page_box--hint"}>
            <strong>{additionalMessage}</strong>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
