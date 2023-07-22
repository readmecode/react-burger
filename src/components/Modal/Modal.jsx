import { useEffect } from "react";
import ReactDOM from "react-dom";
import modalStyles from "./modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

const Modal = ({ children, handleClose }) => {
  const ingredientState = useSelector(
    (state) => state.ingredientDetails.modalState
  );

  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  });

  return ReactDOM.createPortal(
    <>
      <div
        className={
          ingredientState === false || ingredientState === true
            ? modalStyles.modal__container
            : modalStyles.modal__container__disabled
        }
      >
        <div className={modalStyles.modal}>
          <div
            className={modalStyles.button__close}
            onClick={() => handleClose()}
          >
            <CloseIcon type="primary" />
          </div>
          {children}
        </div>
        <ModalOverlay handleClose={() => handleClose()} />
      </div>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
