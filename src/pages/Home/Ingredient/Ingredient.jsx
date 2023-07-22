import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Ingredient = ({ image, text, price, item, id }) => {
  const location = useLocation();

  const brgArr = useSelector((state) => state.burgerConstructor.bunArr);
  const constructorArr = useSelector(
    (state) => state.burgerConstructor.constructorArr
  ).filter((el) => item._id === el._id);
  const [{ isDragging }, drag] = useDrag({
    type: "ingredElement",
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const count = useMemo(() => {
    if (item.type === "bun") {
      return brgArr && brgArr._id === item._id ? 2 : 0;
    }
    return constructorArr.length;
  }, [brgArr, constructorArr.length, item._id, item.type]);

  const backgroundColor = isDragging ? "rgba(75, 75, 200)" : "transparent";

  return (
    <Link to={`/ingredients/${id}`} state={{ background: location }}>
      <div
        className={ingredientStyles.ingredient}
        ref={drag}
        style={{ backgroundColor }}
      >
        {count === 0 ? null : (
          <Counter count={count} size="default" extraClass="m-1" />
        )}
        <img src={image} alt="картинка" className="ingredient__image" />
        <div className={ingredientStyles.ingredient__block__number}>
          <p className={ingredientStyles.ingredient__number}>{price}</p>
          <CurrencyIcon type="primary" className="ingredient__icon" />
        </div>
        <p className={ingredientStyles.ingredient__paragraph}>{text}</p>
      </div>
    </Link>
  );
};

Ingredient.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string,
  item: PropTypes.object.isRequired,
};

export default Ingredient;
