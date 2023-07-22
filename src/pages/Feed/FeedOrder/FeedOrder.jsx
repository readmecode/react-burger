import { FC } from "react";
import feedStyle from "./feed.module.css"
import { IFeedOrder } from "../../../utils/interfaces/interface";
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const FeedOrder: FC<IFeedOrder> = ({order, ingredientData, _id, url}) => {
  const [price, setPrice] = useState<number>()
  const location = useLocation()

  useMemo(() => {
    const arrPrice: Array<number> = []
    order.ingredients?.map((id) => {

      const ingredient = ingredientData.ingredientsData.find(el => el._id === id)
      arrPrice.push(ingredient!.price)
      return setPrice(() => arrPrice.reduce((a, b) => a + b, 0))
    })
  }, [ingredientData?.ingredientsData, order.ingredients])

  return ( 
    <Link to={`${url}${_id}`} state={{ background: location }} className={feedStyle.feedOrder}>
      <li className={feedStyle.feedOrder__info}>
        <h5 className={feedStyle.feedOrder__num}>#{order.number}</h5>
        <p className={feedStyle.feedOrder__time}><FormattedDate date={new Date(order.createdAt)} /></p>
      </li>
      <li className={feedStyle.feedOrder__title__block}>
        <h4 className={feedStyle.feedOrder__title__name}>{order.name}</h4>
      </li>
      <li className={feedStyle.feedOrder__info}>
        <div className={feedStyle.feedOrder__info__images}>
        {
          order.ingredients?.map((id, index) => {
          const ingredient = ingredientData.ingredientsData.find(el => el._id === id)
            return <div className={feedStyle.feedOrder__round__wrapper} key={index}>
            <div className={feedStyle.feedOrder__round}>
            <img 
              src={ingredient?.image} 
              alt={ingredient?.name} 
              className={feedStyle.feedOrder__icon}/>
            </div>
          </div>
          })
        }
        </div>
        <p className={feedStyle.feedOrder__price}>{
          price}<CurrencyIcon type="primary"/>
        </p>
      </li>
    </Link>
  );
}
 
export default FeedOrder;