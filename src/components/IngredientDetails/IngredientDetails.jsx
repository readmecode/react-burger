import React from "react";
import ingrdetStyle from "./IngredientDetails.module.css";

const IngredientDetails = ({ ingrData }) => {
  return (
    <div className={ingrdetStyle.ingr}>
      <h2 className={ingrdetStyle.ingr__title}>Детали ингредиента</h2>
      <img src={ingrData.image} className={ingrdetStyle.ingr__img} />
      <div className={ingrdetStyle.ingr__structure}>
        <h3 className={ingrdetStyle.ingr__title__name}>{ingrData.name}</h3>
        <div className={ingrdetStyle.ingr__box__container}>
          <span className={ingrdetStyle.ingr__box}>
            <h4 className={ingrdetStyle.ingr__box__name}>Калории, ккал</h4>
            <p className={ingrdetStyle.ingr__box__num}>{ingrData.calories}</p>
          </span>
          <span className={ingrdetStyle.ingr__box}>
            <h4 className={ingrdetStyle.ingr__box__name}>Белки, г</h4>
            <p className={ingrdetStyle.ingr__box__num}>{ingrData.proteins}</p>
          </span>
          <span className={ingrdetStyle.ingr__box}>
            <h4 className={ingrdetStyle.ingr__box__name}>Жиры, г</h4>
            <p className={ingrdetStyle.ingr__box__num}>{ingrData.fat}</p>
          </span>
          <span className={ingrdetStyle.ingr__box}>
            <h4 className={ingrdetStyle.ingr__box__name}>Углеводы, г</h4>
            <p className={ingrdetStyle.ingr__box__num}>
              {ingrData.carbohydrates}
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
