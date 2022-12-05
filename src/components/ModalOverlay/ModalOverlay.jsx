import React from "react";
import mdloverlayStyle from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ setState }) => {
  return (
    <div
      className={mdloverlayStyle.overlay}
      onClick={() => setState(true)}
    ></div>
  );
};

ModalOverlay.propTypes = {
  setState: PropTypes.func,
};

export default ModalOverlay;
