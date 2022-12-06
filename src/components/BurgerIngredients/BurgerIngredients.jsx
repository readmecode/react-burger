import React, { useContext, useRef } from "react";
import { IngredientsContext } from "../../services/appContext";

import burgIngrStyle from "./BurgerIngredients.module.css";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";

import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState("one");
  const [ingrData, setIngrData] = React.useState({});

  const { ingr, setIngr, data, addItem, includeIdPost } =
    useContext(IngredientsContext);

  const sectionBuns = useRef();
  const sectionSauces = useRef();
  const sectionMain = useRef();

  return (
    <section className={burgIngrStyle.burgingridients}>
      <h1 className={burgIngrStyle.burgingridients__title}>Соберите бургер</h1>

      <div style={{ display: "flex" }}>
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
                    setIngrData(item);
                    setCurrent("one");
                    addItem(item);
                    includeIdPost(item._id);
                  }}
                >
                  <div className={burgIngrStyle.item}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className={burgIngrStyle.item__picture}
                    />
                    <Counter
                      className={burgIngrStyle.counter}
                      count={1}
                      size="default"
                    />
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
                    setIngrData(item);
                    setCurrent("two");
                    addItem(item);
                    includeIdPost(item._id);
                  }}
                >
                  <div className={burgIngrStyle.item}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className={burgIngrStyle.item__picture}
                    />
                    <Counter
                      className={burgIngrStyle.counter}
                      count={1}
                      size="default"
                    />
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
          {data.map((item) => (
            <button
              key={item._id}
              onClick={() => {
                setIngr(false);
                setIngrData(item);
                setCurrent("three");
                addItem(item);
                includeIdPost(item._id);
              }}
            >
              <div className={burgIngrStyle.item}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={burgIngrStyle.item__picture}
                />
                <Counter
                  className={burgIngrStyle.counter}
                  count={1}
                  size="default"
                />
                <div className={burgIngrStyle.item__value}>
                  <p className={burgIngrStyle.value}>{item.price}</p>
                  <CurrencyIcon
                    className={burgIngrStyle.item__logo}
                    type="primary"
                  />
                </div>
                <p className={burgIngrStyle.item__description}>{item.name}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <Modal state={ingr} setState={setIngr}>
        <IngredientDetails ingrData={ingrData} />
      </Modal>
    </section>
  );
};

export default BurgerIngredients;
