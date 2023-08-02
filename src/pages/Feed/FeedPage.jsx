import { useEffect } from "react";
import feedStyle from "./feed.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  connStart,
  connClosed,
} from "../../services/reducers/feedReducer/feedReducer";
import { wsApiUrl } from "../../utils/Api";
import FeedOrder from "./FeedOrder/FeedOrder";
import { createSelector } from "@reduxjs/toolkit";
import Loader from "../../components/Loader/loader";
import FeedInfo from "./FeedInfo/FeedInfo";

const FeedPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connStart(`${wsApiUrl}/all`));
    return () => {
      dispatch(connClosed());
    };
  }, [dispatch]);

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
  const { feedData, total, totalToday, successData } =
    useSelector(feedSelector);

  return (
    <div className={feedStyle.feed}>
      <h2 className={feedStyle.feed__title}>Лента заказов</h2>
      <div className={feedStyle.feed__container}>
        {successData ? (
          <div
            className={`${feedStyle.feed__block} ${feedStyle.feed__block__orders}`}
          >
            {feedData?.map((el) => (
              <FeedOrder
                key={el._id}
                _id={el._id}
                ingredientData={ingredientData}
                order={el}
                url={`/feed/`}
              />
            ))}
          </div>
        ) : (
          <Loader />
        )}
        <div className={feedStyle.feed__block}>
          {successData ? (
            <FeedInfo
              feedData={feedData}
              total={total}
              totalToday={totalToday}
            />
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
