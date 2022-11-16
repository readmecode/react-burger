import React from "react";
import mdloverlayStyle from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ children, setState }) => {
  return (
    <div className={mdloverlayStyle.overlay} onClick={() => setState(true)}>
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ModalOverlay;
