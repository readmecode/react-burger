import {FC} from "react"
import { useParams } from "react-router-dom";
import profileStyle from "./profile.module.css"
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { createSelector } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/loader";
import { connStart, connClosed } from "../../services/reducers/feedReducer/feedReducer";
import FeedCard from "../../components/FeedCard/FeedCard";
import { wsApiUrl } from "../../utils/Api";
import { getCookie } from "../../utils/Cookies";
import { RootState, useAppDispatch, useAppSelector } from "../../services/store";
import { TIngredientData, TFeedData } from "../../utils/types/type";

const ProfilePage: FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(connStart(`${wsApiUrl}?token=${getCookie("accessToken")?.split(" ")[1]}`))
    return () => {
      dispatch(connClosed())
    }
  }, [dispatch])

  const {id} = useParams()

  const [ingData, setIngData] = useState<TIngredientData[]>()
  const [price, setPrice] = useState<number>()
  const [count, setCount] = useState<TIngredientData[]>()

  const feedSelector  = createSelector(
    (state: RootState )=> state.feedSlice.data,
    (state: RootState )=> state.feedSlice.success,
    (feedData, successData) => ({feedData, successData})
  )
    
  const ingredientSelector = createSelector(
    (state: RootState)=> state.getIngredients.data,
    (ingredientsData) => ({ingredientsData})
  )

  const ingredientData = useAppSelector(ingredientSelector)
  const {feedData, successData} = useAppSelector(feedSelector)
  const feedOrderInfo: TFeedData = feedData.find((el: TFeedData) => el._id === id)!
    
  useEffect(() => {
    let priceArr: number[] = []
    let countArr: TIngredientData[] = []
    let set = new Set<TIngredientData>()
    feedOrderInfo?.ingredients.map(id => {
      //@ts-ignore
      const modalData = ingredientData.ingredientsData?.find((el: TFeedData) => el._id === id)
      priceArr.push(modalData?.price!)
      countArr.push(modalData!)
      set.add(modalData!)
     return (
      setIngData(() => Array.from(set)),
      setCount(() => countArr),
      setPrice(() => priceArr.reduce((a, b) => a + b, 0))
      )
    })
  }, [feedOrderInfo, ingredientData.ingredientsData])
    
  const counter = (arr: TIngredientData[], index: TIngredientData) => {
    return arr.filter((item) => item === index).length;
  }
  return ( 
    <div className={profileStyle.profilePage}>
      {
      successData ? 
        <div className={profileStyle.profile}>
        <p className={profileStyle.profile__order__number}>#{feedOrderInfo?.number}</p>
        <h4 className={profileStyle.profile__name}>{feedOrderInfo?.name}</h4>
        <p className={profileStyle.profile__state}>{feedOrderInfo?.status === "done" ? "Готов" : "Готовится"}</p>
        <h4 className={profileStyle.profile__ing}>Состав:</h4>
        <ul className={profileStyle.profile__container}>
        {
          ingData?.map(el => (
              <FeedCard 
                id={el?._id}
                name={el?.name}
                price={el?.price}
                image={el?.image}
                key={el?._id}
                count={counter(count!, el)}
                />
            ))
          }
        </ul>
        <div className={profileStyle.profile__bottom}>
          <FormattedDate className={profileStyle.profile__date}date={new Date(feedOrderInfo?.createdAt)} />
          <p className={profileStyle.profile__order__price}>{price}<CurrencyIcon type="primary"/></p>
        </div>
        </div> : <Loader/>
      }
    </div>
  );
}
 
export default ProfilePage;