import React from "react";
import ingrdetStyle from "./IngredientDetails.module.css";
import PropTypes from "prop-types";

const IngredientDetails = ({ ingrData }) => {
  return (
    <div className={ingrdetStyle.ingr}>
      <h2 className={ingrdetStyle.ingr__title}>Детали ингредиента</h2>
      <img
        src={ingrData.image}
        alt={ingrData.name}
        className={ingrdetStyle.ingr__pic}
      />
      <div className={ingrdetStyle.ingr__block}>
        <h3 className={ingrdetStyle.ingr__titles}>{ingrData.name}</h3>
        <div className={ingrdetStyle.ingr__specs}>
          <span className={ingrdetStyle.ingr__box}>
            <h4 className={ingrdetStyle.ingr__box__indicator}>Калории, ккал</h4>
            <p className={ingrdetStyle.ingr__box__value}>{ingrData.calories}</p>
          </span>
          <span className={ingrdetStyle.ingr__box}>
            <h4 className={ingrdetStyle.ingr__box__indicator}>Белки, г</h4>
            <p className={ingrdetStyle.ingr__box__value}>{ingrData.proteins}</p>
          </span>
          <span className={ingrdetStyle.ingr__box}>
            <h4 className={ingrdetStyle.ingr__box__indicator}>Жиры, г</h4>
            <p className={ingrdetStyle.ingr__box__value}>{ingrData.fat}</p>
          </span>
          <span className={ingrdetStyle.ingr__box}>
            <h4 className={ingrdetStyle.ingr__box__indicator}>Углеводы, г</h4>
            <p className={ingrdetStyle.ingr__box__value}>
              {ingrData.carbohydrates}
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

IngredientDetails.propTypes = {
  ingrData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      calories: PropTypes.number.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
    })
  ),
};

export default IngredientDetails;
