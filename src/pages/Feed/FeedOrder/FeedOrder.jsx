import feedStyle from "./feed.module.css";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from "uuid";
import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const FeedOrder = ({ order, ingredientData, _id, url }) => {
  const [price, setPrice] = useState();
  const location = useLocation();

  useMemo(() => {
    const arrPrice = [];
    order.ingredients?.map((id) => {
      const ingredient = ingredientData.ingredientsData.find(
        (el) => el._id === id
      );
      arrPrice.push(ingredient?.price);
      return setPrice(() => arrPrice.reduce((a, b) => a + b, 0));
    });
  }, [ingredientData?.ingredientsData, order.ingredients]);

  return (
    <Link
      to={`${url}${_id}`}
      state={{ background: location }}
      className={feedStyle.feedOrder}
    >
      <li className={feedStyle.feedOrder__info}>
        <h5 className={feedStyle.feedOrder__num}>#{order.number}</h5>
        <p className={feedStyle.feedOrder__time}>
          <FormattedDate date={new Date(order.createdAt)} />
        </p>
      </li>
      <li className={feedStyle.feedOrder__title__block}>
        <h4 className={feedStyle.feedOrder__title__name}>{order.name}</h4>
      </li>
      <li className={feedStyle.feedOrder__info}>
        <div className={feedStyle.feedOrder__info__images}>
          {order.ingredients?.map((id) => {
            const ingredient = ingredientData.ingredientsData.find(
              (el) => el._id === id
            );
            return (
              <div
                className={feedStyle.feedOrder__round__wrapper}
                key={uuidv4()}
              >
                <div className={feedStyle.feedOrder__round}>
                  <img
                    src={ingredient?.image}
                    alt={ingredient?.name}
                    className={feedStyle.feedOrder__icon}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <p className={feedStyle.feedOrder__price}>
          {price}
          <CurrencyIcon />
        </p>
      </li>
    </Link>
  );
};

export default FeedOrder;
