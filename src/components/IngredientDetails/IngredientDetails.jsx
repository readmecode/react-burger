import React from "react";
import ingrdetStyle from "./IngredientDetails.module.css";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";
import { useSelector } from "react-redux";

const IngredientDetails = () => {
  const ingrsData = useSelector((state) => state.ingrSpecs.ingrData);
  return (
    <div className={ingrdetStyle.ingr}>
      <h2 className={ingrdetStyle.ingr__title}>Детали ингредиента</h2>
      <img
        src={ingrsData.image}
        alt={ingrsData.name}
        className={ingrdetStyle.ingr__pic}
      />
      <div className={ingrdetStyle.ingr__block}>
        <h3 className={ingrdetStyle.ingr__titles}>{ingrsData.name}</h3>
        <div className={ingrdetStyle.ingr__specs}>
          <span className={ingrdetStyle.ingr__box}>
            <h4 className={ingrdetStyle.ingr__box__indicator}>Калории, ккал</h4>
            <p className={ingrdetStyle.ingr__box__value}>
              {ingrsData.calories}
            </p>
          </span>
          <span className={ingrdetStyle.ingr__box}>
            <h4 className={ingrdetStyle.ingr__box__indicator}>Белки, г</h4>
            <p className={ingrdetStyle.ingr__box__value}>
              {ingrsData.proteins}
            </p>
          </span>
          <span className={ingrdetStyle.ingr__box}>
            <h4 className={ingrdetStyle.ingr__box__indicator}>Жиры, г</h4>
            <p className={ingrdetStyle.ingr__box__value}>{ingrsData.fat}</p>
          </span>
          <span className={ingrdetStyle.ingr__box}>
            <h4 className={ingrdetStyle.ingr__box__indicator}>Углеводы, г</h4>
            <p className={ingrdetStyle.ingr__box__value}>
              {ingrsData.carbohydrates}
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

IngredientDetails.propTypes = {
  ingrsData: PropTypes.objectOf(ingredientType),
};

export default IngredientDetails;
