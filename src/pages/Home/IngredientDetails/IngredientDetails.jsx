import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../../components/Loader/loader";
import ingDetStyle from "./IngredientDetails.module.css";

const IngredientDetails = () => {
  const { id } = useParams();
  const ingDetails = useSelector((state) => state.getIngredients.data.data);
  const currentIngredient =
    ingDetails && ingDetails.find((elem) => elem._id === id);

  return (
    <>
      {!currentIngredient ? (
        <Loader />
      ) : (
        <div className={ingDetStyle.ingredient__modal}>
          <h4 className={ingDetStyle.ingredient__title}>Детали ингредиента</h4>
          <img
            src={currentIngredient && currentIngredient.image}
            alt={currentIngredient && currentIngredient.name}
            className={ingDetStyle.ingredient__modal__img}
          />
          <div className={ingDetStyle.ingredient__structure}>
            <h3 className={ingDetStyle.ingredient__title__name}>
              {currentIngredient && currentIngredient.name}
            </h3>
            <div className={ingDetStyle.ingredient__block__container}>
              <span className={ingDetStyle.ingredient__block}>
                <h5 className={ingDetStyle.ingredient__block__name}>
                  Калории, ккал
                </h5>
                <p className={ingDetStyle.ingredient__block__num}>
                  {currentIngredient && currentIngredient.calories}
                </p>
              </span>
              <span className={ingDetStyle.ingredient__block}>
                <h5 className={ingDetStyle.ingredient__block__name}>
                  Белки, г
                </h5>
                <p className={ingDetStyle.ingredient__block__num}>
                  {currentIngredient && currentIngredient.proteins}
                </p>
              </span>
              <span className={ingDetStyle.ingredient__block}>
                <h5 className={ingDetStyle.ingredient__block__name}>Жиры, г</h5>
                <p className={ingDetStyle.ingredient__block__num}>
                  {currentIngredient && currentIngredient.fat}
                </p>
              </span>
              <span className={ingDetStyle.ingredient__block}>
                <h5 className={ingDetStyle.ingredient__block__name}>
                  Углеводы, г
                </h5>
                <p className={ingDetStyle.ingredient__block__num}>
                  {currentIngredient && currentIngredient.carbohydrates}
                </p>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IngredientDetails;
