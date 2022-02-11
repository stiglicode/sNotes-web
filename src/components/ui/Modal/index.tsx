import React from "react";
import { Button, IconButton, List, ListItem, ListItemButton, ListItemText, Modal } from "@mui/material";
import { IModal } from "../../../utilities/types/modal.type";
import { Close } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import Draggable from "react-draggable";

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
}) => {
  const redirect = useNavigate();

  const { tab, action } = useParams();

  const handleCloseEvent = (event: any) => {
    onClose && onClose(event);
    return redirect("/");
  };

  const handleOkEvent = (event: any) => {
    onOk && onOk(event);
    return redirect("/");
  };

  return (
    <Modal open={true} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <div className={"modal-wrapper"}>
        <label
          aria-label={"modal-mask"}
          className={"modal-wrapper_mask"}
          onClick={(event) => maskCloseable && handleCloseEvent(event)}
        />
        <Draggable handle={"#modal-head"} bounds={"parent"}>
          <div className={"modal-wrapper_box"} style={{ width: `${width / 16}rem` }}>
            {head ? (
              <div className={`modal-wrapper_box--head ${headPadding ? "safe-space" : ""}`} id="modal-head">
                <span className={"modal-wrapper_box--head-label"}>{label}</span>
                <IconButton className={"modal-wrapper_box--head-close"} onClick={handleCloseEvent}>
                  <Close />
                </IconButton>
              </div>
            ) : (
              <></>
            )}
            <div className={"modal-wrapper_box--body"}>
              {list.length ? (
                <List dense className={"modal-wrapper_box--body-list"}>
                  {list.map((item, key) => {
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
              <div className={`modal-wrapper_box--body-wrapper ${bodyPadding ? "safe-space" : ""}`}>{body}</div>
            </div>
            {footer ? (
              <div className={"modal-wrapper_box--footer"}>
                <Button variant={"contained"} onClick={handleCloseEvent}>
                  {closeText}
                </Button>
                <Button variant={"outlined"} onClick={handleOkEvent}>
                  {okText}
                </Button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </Draggable>
      </div>
    </Modal>
  );
};

export default CustomModal;
