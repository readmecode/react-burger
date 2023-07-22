import { FC, useEffect, useState } from "react";
import { useAppSelector, RootState } from "../../../services/store";
import { useParams } from "react-router-dom";
import mfeedStyle from "./mfeed.module.css"
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { createSelector } from "@reduxjs/toolkit";
import Loader from "../../../components/Loader/loader";
import { TFeedData, TIngredientData } from "../../../utils/types/type";

const ModalFeed: FC = () => {
  const {id} = useParams()
  const [ingData, setIngData] = useState<TIngredientData[]>()
  const [price, setPrice] = useState<number>()
  const [count, setCount] = useState<TIngredientData[]>()

  const feedSelector  = createSelector(
    (state: RootState) => state.feedSlice.data,
    (state: RootState) => state.feedSlice.success,
    (feedData, successData) => ({feedData, successData})
  )

  const ingredientSelector = createSelector(
    (state: RootState) => state.getIngredients.data,
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
        // @ts-ignore
        const modalData = ingredientData.ingredientsData?.find((el: TFeedData) => el?._id === id)
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
    <>
    {
      successData ? 
      <div className={mfeedStyle.mfeed}>
      <p className={mfeedStyle.mfeed__order__number}>#{feedOrderInfo?.number}</p>
      <h4 className={mfeedStyle.mfeed__name}>{feedOrderInfo?.name}</h4>
      <p className={mfeedStyle.mfeed__state}>{feedOrderInfo?.status === "done" ? "Готов" : "Готовится"}</p>
      <h4 className={mfeedStyle.mfeed__ing}>Состав:</h4>
      <ul className={mfeedStyle.mfeed__container}>
      {
        ingData?.map((el: TIngredientData) => (
          
        <li className={mfeedStyle.mfeed__block} key={el?._id}>
          <div className={mfeedStyle.mfeed__info__block}>
            <span className={mfeedStyle.mfeed__icon__block} key={el?._id}>
              <img src={el?.image} alt={`${el?.name}`} className={mfeedStyle.mfeed__order__icon}/>
            </span>
            <h5 className={mfeedStyle.mfeed__order__name}>{el?.name}</h5>
          </div>
          <div className={mfeedStyle.mfeed__price}>
            <p className={mfeedStyle.mfeed__order__price}>{counter(count!, el)} x {el?.price}</p>
            <CurrencyIcon type="primary"/>
          </div>
        </li>
          ))
        }
      </ul>
      <div className={mfeedStyle.mfeed__bottom}>
        <FormattedDate className={mfeedStyle.mfeed__date} date={new Date(feedOrderInfo?.createdAt)} />
        <p className={mfeedStyle.mfeed__order__price}>{price}<CurrencyIcon type="primary"/></p>
      </div>
    </div> : <Loader/>
    }
    </>
  );
}
 
export default ModalFeed;