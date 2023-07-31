import { useSelector } from "react-redux";
import overlayStyles from "./modalOverlay.module.css";

const ModalOverlay = ({ handleClose }) => {
  const ingredientState = useSelector(
    (state) => state.ingredientDetails.modalState
  );
  return (
    <div
      className={
        ingredientState === false || ingredientState === true
          ? overlayStyles.modal__overlay
          : overlayStyles.modal__overlay__disabled
      }
      onClick={() => handleClose()}
    ></div>
  );
};

export default ModalOverlay;
