import React from "react";
import ingrDetailsStyle from "./IngredientDetails.module.css";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientDetails = ({ image, text, price }) => {
  return (
    <div className={ingrDetailsStyle.item}>
      <img src={image} className={ingrDetailsStyle.item__picture} />
      <div className={ingrDetailsStyle.item__value}>
        <p className={ingrDetailsStyle.value}>{price}</p>
        <CurrencyIcon className={ingrDetailsStyle.item__logo} type="primary" />
      </div>
      <p className={ingrDetailsStyle.item__description}>{text}</p>
    </div>
  );
};

export default IngredientDetails;
