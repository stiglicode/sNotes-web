import React from "react";
import { Button, IconButton, Modal } from "@mui/material";
import { ModalType } from "../../../utilities/types/modal.type";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Draggable from "react-draggable";

const CustomModal = ({
  closeText = "Cancle",
  okText = "Ok",
  onOk,
  onClose,
  head = true,
  maskCloseable = true,
  body,
  label,
  width = 500,
}: ModalType) => {
  const redirect = useNavigate();

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
              <div className={"modal-wrapper_box--head"} id="modal-head">
                <span className={"modal-wrapper_box--head-label"}>{label}</span>
                <IconButton className={"modal-wrapper_box--head-close"} onClick={handleCloseEvent}>
                  <Close />
                </IconButton>
              </div>
            ) : (
              <></>
            )}
            <div className={"modal-wrapper_box--body"}>{body}</div>
            <div className={"modal-wrapper_box--footer"}>
              <Button variant={"contained"} onClick={handleCloseEvent}>
                {closeText}
              </Button>
              <Button variant={"outlined"} onClick={handleOkEvent}>
                {okText}
              </Button>
            </div>
          </div>
        </Draggable>
      </div>
    </Modal>
  );
};

export default CustomModal;
