import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import profileStyle from "./profile.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { createSelector } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/loader";
import {
  connStart,
  connClosed,
} from "../../services/reducers/feedReducer/feedReducer";
import FeedCard from "../../components/FeedCard/FeedCard";
import { wsApiUrl } from "../../utils/Api";
import { getCookie } from "../../utils/Cookies";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState();

  useEffect(() => {
    dispatch(
      connStart(`${wsApiUrl}?token=${getCookie("accessToken").split(" ")[1]}`)
    );
    return () => {
      dispatch(connClosed());
    };
  }, [dispatch]);

  const { id } = useParams();
  const [ingData, setIngData] = useState();
  const [price, setPrice] = useState();

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
    <div className={profileStyle.profilePage}>
      {successData ? (
        <div className={profileStyle.profile}>
          <p className={profileStyle.profile__order__number}>
            #{feedOrderInfo && feedOrderInfo.number}
          </p>
          <h4 className={profileStyle.profile__name}>
            {feedOrderInfo && feedOrderInfo.name}
          </h4>
          <p className={profileStyle.profile__state}>
            {feedOrderInfo && feedOrderInfo.status === "done"
              ? "Готов"
              : "Готовится"}
          </p>
          <h4 className={profileStyle.profile__ing}>Состав:</h4>
          <ul className={profileStyle.profile__container}>
            {ingData?.map((el) => (
              <FeedCard
                id={el._id}
                name={el.name}
                price={el.price}
                image={el.image}
                key={el._id}
                count={counter(count, el)}
              />
            ))}
          </ul>
          <div className={profileStyle.profile__bottom}>
            <FormattedDate
              className={profileStyle.profile__date}
              date={new Date(feedOrderInfo?.createdAt)}
            />
            <p className={profileStyle.profile__order__price}>
              {price}
              <CurrencyIcon />
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ProfilePage;
