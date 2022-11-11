import React from "react";
import ordDetailsStyle from "./OrderDetails.module.css";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const OrderDetails = ({ location, locked, name, price, image }) => {
  return (
    <div
      className={
        location === "top" || location === "bottom"
          ? ordDetailsStyle.select
          : null
      }
    >
      {location !== "top" && location !== "bottom" ? (
        <DragIcon type="primary" style={{ display: "none" }} />
      ) : null}
      <ConstructorElement
        type={location}
        isLocked={locked}
        text={name}
        price={price}
        thumbnail={image}
      />
    </div>
  );
};

export default OrderDetails;
