import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import mdlStyle from "./Modal.module.css";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

const Modal = ({ children, state, setState }) => {
  useEffect(() => {
    const handleClose = (e) => {
      if (e.key == "Escape") {
        setState(true);
      }
    };
    document.addEventListener("keydown", handleClose);
    return () => {
      document.addEventListener("keyup", handleClose);
    };
  }, [setState]);

  return ReactDOM.createPortal(
    <div
      className={state === false ? mdlStyle.modal : mdlStyle.modal__inactive}
    >
      <ModalOverlay setState={setState} />
      <div className={mdlStyle.modal__box}>
        <button className={mdlStyle.closebtn} onClick={() => setState(true)}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modalwindow")
  );
};

export default Modal;
