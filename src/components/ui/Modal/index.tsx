import React, { useEffect, useState } from "react";
import { Button, IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { IModal } from "../../../utilities/types/modal.type";
import { Close } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import Draggable from "react-draggable";
import { nanoid } from "nanoid";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

const CustomModal: React.FC<IModal> = ({
  closeText = "Cancle",
  okText = "Ok",
  onOk,
  onClose,
  head = true,
  maskCloseable = true,
  body,
  label,
  width = 500,
  footer = false,
  bodyPadding = true,
  headPadding = true,
  list,
  maxHeight = 500,
  open,
  disable,
  okType = "primary",
  closeType = "primary",
}) => {
  const [mounted, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);
  const redirect = useNavigate();
  const { tab, action } = useParams();

  const handleCloseEvent = (event: any) => {
    onClose && onClose(event);
  };

  const handleOkEvent = (event: any) => {
    onOk && onOk(event);
  };

  const headHash = nanoid();

  if (!mounted) return <></>;

  return mounted ? (
    ReactDOM.createPortal(
      <CSSTransition in={open} timeout={300} unmountOnExit>
        <div className={"modal-wrapper"}>
          <label
            aria-label={"modal-mask"}
            className={"modal-wrapper_mask"}
            onClick={(event) => maskCloseable && handleCloseEvent(event)}
          />
          <Draggable handle={`#modal-head--${headHash}`} bounds={"parent"} disabled={disable}>
            <div className={"modal-wrapper_box--parent"}>
              <div className={"modal-wrapper_box"} style={{ width: `${width / 16}rem`, maxHeight: `${maxHeight}px` }}>
                {head ? (
                  <div
                    className={`modal-wrapper_box--head ${headPadding ? "safe-space" : ""}`}
                    id={`modal-head--${headHash}`}
                  >
                    <span className={"modal-wrapper_box--head-label"}>{label}</span>
                    <IconButton className={"modal-wrapper_box--head-close"} onClick={handleCloseEvent}>
                      <Close />
                    </IconButton>
                  </div>
                ) : (
                  <></>
                )}
                <div className={"modal-wrapper_box--body"}>
                  {list?.length ? (
                    <List dense className={"modal-wrapper_box--body-list"}>
                      {list?.map((item, key) => {
                        return (
                          <ListItem
                            disablePadding
                            key={key}
                            selected={action === item.target}
                            className={item.notifications > 0 ? "notification" : ""}
                          >
                            <ListItemButton onClick={() => redirect(`${tab}/${item.target}`)}>
                              {item.icon}
                              {item.notifications > 0 ? (
                                <span className={"notification-count list"}>{item.notifications}</span>
                              ) : (
                                <></>
                              )}
                              <ListItemText primary={item.label} />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  ) : (
                    <></>
                  )}
                  <div
                    className={`modal-wrapper_box--body-wrapper ${bodyPadding ? "safe-space" : ""} ${
                      !head ? "y-padd" : ""
                    }`}
                  >
                    {body}
                  </div>
                </div>
                {footer ? (
                  <div className={"modal-wrapper_box--footer"}>
                    <Button color={closeType} variant={"outlined"} onClick={handleCloseEvent}>
                      {closeText}
                    </Button>
                    <Button color={okType} variant={"contained"} sx={{ boxShadow: "unset" }} onClick={handleOkEvent}>
                      {okText}
                    </Button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </Draggable>
        </div>
      </CSSTransition>,
      document.getElementById("_root")!
    )
  ) : (
    <></>
  );
};

export default CustomModal;
