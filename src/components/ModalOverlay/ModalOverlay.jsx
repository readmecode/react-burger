import React from "react";
import mdloverlayStyle from "./ModalOverlay.module.css";

const ModalOverlay = ({ setState }) => {
  return (
    <button className={mdloverlayStyle.overlay}>
      {" "}
      onClick={() => setState(true)}
    </button>
  );
};

export default ModalOverlay;
