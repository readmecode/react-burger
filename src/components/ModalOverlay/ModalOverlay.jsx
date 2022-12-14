import React from "react";
import mdloverlayStyle from "./ModalOverlay.module.css";

const ModalOverlay = ({ setState}) => {
  return (
    <div
      className={mdloverlayStyle.overlay}
      onClick={() => setState(true)}
    ></div>
  );
};
export default ModalOverlay;
