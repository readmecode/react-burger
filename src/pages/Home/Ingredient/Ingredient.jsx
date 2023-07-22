import { FC, useMemo } from "react";
import ingredientStyles from "./ingredient.module.css"
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { IIngredient } from "../../../utils/interfaces/interface";
import {TIngredientData} from "../../../utils/types/type";
import { RootState, useAppSelector } from "../../../services/store";

const Ingredient: FC<IIngredient> = ({image, text, price, item, id}) => {
  const location = useLocation()

  const brgArr  = useAppSelector((state: RootState) => state.burgerConstructor.bunArr)
  const constructorArr = useAppSelector((state: RootState) => state.burgerConstructor.constructorArr)
  .filter((el: TIngredientData) => item._id === el._id)
  const [{isDragging}, drag] = useDrag({
    type: "ingredElement",
    item: item,
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })
  
  const count = useMemo(() => {
    if(item.type === "bun") {
      return brgArr._id === item._id ? 2 : 0
    }
    return constructorArr.length
  }, [brgArr, constructorArr.length, item._id, item.type])

  const backgroundColor = isDragging ? "rgba(75, 75, 200)" : "transparent"

  return ( 
  <Link to={`/ingredients/${id}`} state={{ background: location }}>
    <button className={ingredientStyles.ingredient} ref={drag} style={{ backgroundColor }}>
      {count === 0 ? null : (<Counter  count={count} size="default" extraClass="m-1"/>)}
      <img src={image} alt="картинка" className="ingredient__image"/>
      <div className={ingredientStyles.ingredient__block__number}>
        <p className={ingredientStyles.ingredient__number}>{price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <p className={ingredientStyles.ingredient__paragraph}>{text}</p>
    </button>
  </Link>
  );
}
 
export default Ingredient;