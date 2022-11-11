import React, { useEffect } from "react";
import mdloverlayStyle from "./Modal.module.css";

const ModalOverlay = ({setState}) => {
    return (
        <button className={mdloverlayStyle.overlay}> onClick={() => setState(true)}
        </button>
    )
}

export default ModalOverlay;