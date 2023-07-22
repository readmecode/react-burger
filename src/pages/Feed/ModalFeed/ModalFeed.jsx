import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import mfeedStyle from "./mfeed.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { createSelector } from "@reduxjs/toolkit";
import { useEffect, useMemo, useState } from "react";
import Loader from "../../../components/Loader/loader";

const ModalFeed = () => {
  const { id } = useParams();
  const [ingData, setIngData] = useState();
  const [price, setPrice] = useState();
  const [count, setCount] = useState();

  const feedSelector = createSelector(
    (state) => state.feedSlice.data,
    (state) => state.feedSlice.success,
    (feedData, successData) => ({ feedData, successData })
  );

  const ingredientSelector = createSelector(
    (state) => state.getIngredients.data.data,
    (ingredientsData) => ({ ingredientsData })
  );

  const ingredientData = useSelector(ingredientSelector);
  const { feedData, successData } = useSelector(feedSelector);
  const feedOrderInfo = feedData.find((el) => el._id === id);

  useEffect(() => {
    let priceArr = [];
    let countArr = [];
    let set = new Set();
    feedOrderInfo &&
      feedOrderInfo.ingredients.map((id) => {
        const modalData = ingredientData.ingredientsData.find(
          (el) => el._id === id
        );
        priceArr.push(modalData.price);
        countArr.push(modalData);
        set.add(modalData);
        return (
          setIngData(() => Array.from(set)),
          setCount(() => countArr),
          setPrice(() => priceArr.reduce((a, b) => a + b, 0))
        );
      });
  }, [feedOrderInfo, ingredientData.ingredientsData]);

  const counter = (arr, index) => {
    return arr.filter((item) => item === index).length;
  };

  return (
    <>
      {successData ? (
        <div className={mfeedStyle.mfeed}>
          <p className={mfeedStyle.mfeed__order__number}>
            #{feedOrderInfo && feedOrderInfo.number}
          </p>
          <h4 className={mfeedStyle.mfeed__name}>
            {feedOrderInfo && feedOrderInfo.name}
          </h4>
          <p className={mfeedStyle.mfeed__state}>
            {feedOrderInfo && feedOrderInfo.status === "done"
              ? "Готов"
              : "Готовится"}
          </p>
          <h4 className={mfeedStyle.mfeed__ing}>Состав:</h4>
          <ul className={mfeedStyle.mfeed__container}>
            {ingData?.map((el) => (
              <li className={mfeedStyle.mfeed__block} key={el._id}>
                <div className={mfeedStyle.mfeed__info__block}>
                  <span className={mfeedStyle.mfeed__icon__block}>
                    <img
                      src={el.image}
                      alt={`${el.name}`}
                      className={mfeedStyle.mfeed__order__icon}
                    />
                  </span>
                  <h5 className={mfeedStyle.mfeed__order__name}>{el.name}</h5>
                </div>
                <div className={mfeedStyle.mfeed__price}>
                  <p className={mfeedStyle.mfeed__order__price}>
                    {counter(count, el)} x {el.price}
                  </p>
                  <CurrencyIcon />
                </div>
              </li>
            ))}
          </ul>
          <div className={mfeedStyle.mfeed__bottom}>
            <FormattedDate
              className={mfeedStyle.mfeed__date}
              date={new Date(feedOrderInfo?.createdAt)}
            />
            <p className={mfeedStyle.mfeed__order__price}>
              {price}
              <CurrencyIcon />
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ModalFeed;
