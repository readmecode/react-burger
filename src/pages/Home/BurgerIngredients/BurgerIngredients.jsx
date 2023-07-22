import React, { useState, useEffect, FC} from "react";
import brgIngredientsStyles from "./brgIngredients.module.css"
import Ingredient from "../Ingredient/Ingredient";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useInView } from "react-intersection-observer";
import { getIngDetails } from "../../../services/reducers/HomeReducers/ingredientDetails";
import { changeStateModal } from "../../../services/reducers/HomeReducers/ingredientDetails";
import Loader from "../../../components/Loader/loader";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../services/store";
import { useAppDispatch, useAppSelector } from "../../../services/store";
import {TIngredientData} from "../../../utils/types/type";

const BurgerIngredients: FC = () => {
    const dispatch = useAppDispatch()
    const ingredientsSelector = createSelector(
      (state: RootState) => state.getIngredients.data,
      (state: RootState) => state.getIngredients.success,
      (data, success) => ({data, success})
    )
    const {data, success} = useAppSelector(ingredientsSelector)

    const [current, setCurrent] = useState("one")

    const [blockBuns, bunsView] = useInView({ threshold: 0 })
    const [blockSauces, saucesView] = useInView({ threshold: 0 })
    const [blockMain, mainView] = useInView({ threshold: 0 })

    useEffect(() => {
      if (bunsView) {
        setCurrent("one");
      } else if (saucesView) {
        setCurrent("two");
      } else if (mainView) {
        setCurrent("three");
      }
    }, [bunsView, saucesView, mainView]);

    const scrollToBlock = (element: string) => {
      setCurrent(element)
      const scrollBlock = document.querySelector<HTMLElement>(`#${element}`)
      scrollBlock?.scrollIntoView({behavior: "smooth"})
    }
  return (
      <section className={brgIngredientsStyles.ingredients}>
        <h1 className={brgIngredientsStyles.ingredients__title}>Соберите бургер</h1>

        <div className={brgIngredientsStyles.ingredients__tab}>
          <Tab value="one" active={current === 'one'} onClick={() => scrollToBlock("one")}>
            Булки
          </Tab>
          <Tab value="two" active={current === 'two'} onClick={() => scrollToBlock("two")}>
            Соусы
          </Tab>
          <Tab  value="three" active={current === 'three'} onClick={() => scrollToBlock("three")}>
            Начинки
          </Tab>
        </div>

        <div className={brgIngredientsStyles.ingredients__container}>
          {!success ? (<Loader></Loader>) : (
          <>
          <h3 ref={blockBuns} id="one" className={brgIngredientsStyles.ingredients__container__title}>Булки</h3>
          <ul className={brgIngredientsStyles.ingredients__block} aria-labelledby="buns">
          {data?.map((block: TIngredientData) => (
            block.type === "bun" && <li
              key={block._id} 
              onClick={() => {
              dispatch(changeStateModal(true)); 
              dispatch(getIngDetails(block));
              }}
            >
              <Ingredient image={block.image} text={block.name} price={block.price} item={block} id={block._id}/>
            </li>
          ))}
          </ul>

          <h3 ref={blockSauces} id="two" className={brgIngredientsStyles.ingredients__container__title}>Соусы</h3>
          <ul className={brgIngredientsStyles.ingredients__block} aria-labelledby="sauces">
          {data?.map((block: TIngredientData) => (
            block.type === "sauce" && <li 
              key={block._id} 
              onClick={() => {
              dispatch(changeStateModal(true)); 
              dispatch(getIngDetails(block));
              }}
            >
              <Ingredient image={block.image} text={block.name} price={block.price} item={block} id={block._id}/>
            </li> 
          ))}
          </ul>

          <h3 ref={blockMain} id="three" className={brgIngredientsStyles.ingredients__container__title}>Начинки</h3>
          <ul className={brgIngredientsStyles.ingredients__block}>
          {data?.map((block: TIngredientData) => (
            block.type === "main" && <li 
              key={block._id} 
              onClick={() => {
              dispatch(changeStateModal(true)); 
              dispatch(getIngDetails(block)); 
              }}
            >
              <Ingredient image={block.image} text={block.name} price={block.price} item={block} id={block._id}/>
            </li>
          ))}
          </ul>
          </>)}
        </div>
      </section>
    );
  }



export default BurgerIngredients