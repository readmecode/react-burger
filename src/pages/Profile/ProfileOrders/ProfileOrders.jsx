import pOrdersStyle from "./porders.module.css";
import {
  connStart,
  connClosed,
} from "../../../services/reducers/feedReducer/feedReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { wsApiUrl } from "../../../utils/Api";
import { getCookie } from "../../../utils/Cookies";
import { createSelector } from "@reduxjs/toolkit";
import { useState } from "react";
import FeedOrder from "../../Feed/FeedOrder/FeedOrder";
import Loader from "../../../components/Loader/loader";

const ProfileOrders = () => {
  const feedSelector = createSelector(
    (state) => state.feedSlice.data,
    (state) => state.feedSlice.total,
    (state) => state.feedSlice.totalToday,
    (state) => state.feedSlice.success,
    (feedData, total, totalToday, successData) => ({
      feedData,
      total,
      totalToday,
      successData,
    })
  );
  const ingredientSelector = createSelector(
    (state) => state.getIngredients.data.data,
    (ingredientsData) => ({ ingredientsData })
  );

  const ingredientData = useSelector(ingredientSelector);
  const { feedData, successData } = useSelector(feedSelector);

  return (
    <div className={pOrdersStyle.pOrder}>
      {successData ? (
        <div className={pOrdersStyle.pOrder__card}>
          {feedData?.map((el) => (
            <FeedOrder
              key={el._id}
              _id={el._id}
              ingredientData={ingredientData}
              order={el}
              url={`/profile/orders/`}
            />
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ProfileOrders;
