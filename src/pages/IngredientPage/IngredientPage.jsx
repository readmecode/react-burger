import IngredientStyle from "./ingredient.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/loader";
import { createSelector } from "@reduxjs/toolkit";

const IngredientPage = () => {
  const { id } = useParams();
  const ingredientSelector = createSelector(
    (state) => state.getIngredients.data.data,
    (ingDetails) => ({ ingDetails })
  );
  const { ingDetails } = useSelector(ingredientSelector);
  const currentIngredient =
    ingDetails && ingDetails.find((elem) => elem._id === id);

  return (
    <div className={IngredientStyle.ingredient__modal}>
      {!currentIngredient ? (
        <Loader />
      ) : (
        <>
          <img
            src={currentIngredient.image}
            alt={currentIngredient.name}
            className={IngredientStyle.ingredient__modal__img}
          />
          <div className={IngredientStyle.ingredient__structure}>
            <h3 className={IngredientStyle.ingredient__title__name}>
              {currentIngredient.name}
            </h3>
            <div className={IngredientStyle.ingredient__block__container}>
              <span className={IngredientStyle.ingredient__block}>
                <h5 className={IngredientStyle.ingredient__block__name}>
                  Калории, ккал
                </h5>
                <p className={IngredientStyle.ingredient__block__num}>
                  {currentIngredient.calories}
                </p>
              </span>
              <span className={IngredientStyle.ingredient__block}>
                <h5 className={IngredientStyle.ingredient__block__name}>
                  Белки, г
                </h5>
                <p className={IngredientStyle.ingredient__block__num}>
                  {currentIngredient.proteins}
                </p>
              </span>
              <span className={IngredientStyle.ingredient__block}>
                <h5 className={IngredientStyle.ingredient__block__name}>
                  Жиры, г
                </h5>
                <p className={IngredientStyle.ingredient__block__num}>
                  {currentIngredient.fat}
                </p>
              </span>
              <span className={IngredientStyle.ingredient__block}>
                <h5 className={IngredientStyle.ingredient__block__name}>
                  Углеводы, г
                </h5>
                <p className={IngredientStyle.ingredient__block__num}>
                  {currentIngredient.carbohydrates}
                </p>
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IngredientPage;
