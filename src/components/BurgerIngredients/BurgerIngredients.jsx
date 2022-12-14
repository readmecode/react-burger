import React, { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useDrag } from "react-dnd";

import burgIngrStyle from "./BurgerIngredients.module.css";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import {
  getData,
  getIngrId,
  getIngrData,
} from "../../services/actions/actions";

import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredients = ({item}) => {
  const [current, setCurrent] = useState("one");
  const [ingr, setIngr] = useState(true);

  const data = useSelector((state) => state.getIngrData.data);

  const sectionBuns = useRef();
  const sectionSauces = useRef();
  const sectionMain = useRef();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const selectBuns = useSelector((state) => state.getConstr.constrBun);
  const selectedItem = useSelector((state) => state.getConstr.construct).filter(
    (itm) => item._id === itm._id
  );

  const [{ isDragging }, dragRef] = useDrag({
    type: "constrItem",
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const checkCount = useMemo(() => {
    if (item.type === "bun") {
      return selectBuns && selectBuns._id === item._id ? 2 : 0;
    }
    return selectedItem.length;
  });

  const opacity = isDragging ? 0.3 : 1;

  return (
    <section className={burgIngrStyle.burgingridients}>
      <h1 className={burgIngrStyle.burgingridients__title}>Соберите бургер</h1>

      <div className={burgIngrStyle.burgingridients__titlemenu}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <div className={burgIngrStyle.burgingridients__menu}>
        <h2
          ref={sectionBuns}
          className={burgIngrStyle.burgingridients__menu__title}
        >
          Булки
        </h2>
        <div className={burgIngrStyle.burgingridients__menu__box}>
          {data.map(
            (item) =>
              item.type === "bun" && (
                <button
                  key={item._id}
                  onClick={() => {
                    setIngr(false);
                    setCurrent("one");
                    dispatch(getIngrData(item));
                    dispatch(getIngrId(item._id));
                  }}
                >
                  <div
                    className={burgIngrStyle.item}
                    ref={dragRef}
                    style={{ opacity }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className={burgIngrStyle.item__picture}
                    />
                    {checkCount === 0 ? null : (
                      <Counter
                        className={burgIngrStyle.counter}
                        count={checkCount}
                        size="default"
                      />
                    )}

                    <div className={burgIngrStyle.item__value}>
                      <p className={burgIngrStyle.value}>{item.price}</p>
                      <CurrencyIcon
                        className={burgIngrStyle.item__logo}
                        type="primary"
                      />
                    </div>
                    <p className={burgIngrStyle.item__description}>
                      {item.name}
                    </p>
                  </div>
                </button>
              )
          )}
        </div>

        <h2
          ref={sectionSauces}
          className={burgIngrStyle.burgingridients__menu__title}
        >
          Соусы
        </h2>
        <div className={burgIngrStyle.burgingridients__menu__box}>
          {data.map(
            (item) =>
              item.type === "sauce" && (
                <button
                  key={item._id}
                  onClick={() => {
                    setIngr(false);
                    setCurrent("two");
                    dispatch(getIngrData(item));
                    dispatch(getIngrId(item._id));
                  }}
                >
                  <div
                    className={burgIngrStyle.item}
                    ref={dragRef}
                    style={{ opacity }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className={burgIngrStyle.item__picture}
                    />
                    {checkCount === 0 ? null : (
                      <Counter
                        className={burgIngrStyle.counter}
                        count={checkCount}
                        size="default"
                      />
                    )}
                    <div className={burgIngrStyle.item__value}>
                      <p className={burgIngrStyle.value}>{item.price}</p>
                      <CurrencyIcon
                        className={burgIngrStyle.item__logo}
                        type="primary"
                      />
                    </div>
                    <p className={burgIngrStyle.item__description}>
                      {item.name}
                    </p>
                  </div>
                </button>
              )
          )}
        </div>

        <h2
          ref={sectionMain}
          className={burgIngrStyle.burgingridients__menu__title}
        >
          Начинки
        </h2>
        <div className={burgIngrStyle.burgingridients__menu__box}>
          {data.map(
            (item) =>
              item.type === "main" && (
                <button
                  key={item._id}
                  onClick={() => {
                    setIngr(false);
                    setCurrent("three");
                    dispatch(getIngrData(item));
                    dispatch(getIngrId(item._id));
                  }}
                >
                  <div
                    className={burgIngrStyle.item}
                    ref={dragRef}
                    style={{ opacity }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className={burgIngrStyle.item__picture}
                    />
                    {checkCount === 0 ? null : (
                      <Counter
                        className={burgIngrStyle.counter}
                        count={checkCount}
                        size="default"
                      />
                    )}
                    <div className={burgIngrStyle.item__value}>
                      <p className={burgIngrStyle.value}>{item.price}</p>
                      <CurrencyIcon
                        className={burgIngrStyle.item__logo}
                        type="primary"
                      />
                    </div>
                    <p className={burgIngrStyle.item__description}>
                      {item.name}
                    </p>
                  </div>
                </button>
              )
          )}
        </div>
      </div>
      <Modal state={ingr} setState={setIngr}>
        <IngredientDetails />
      </Modal>
    </section>
  );
};

export default BurgerIngredients;
