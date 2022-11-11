import React from "react";
import burgIngrStyle from "./BurgerIngredients.module.css";

import {
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = React.useState("one");
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
        <h2 className={burgIngrStyle.burgingridients__menu__title}>Булки</h2>
        <div className={burgIngrStyle.burgingridients__menu__box}>
          {data.map(
            (item) =>
              item.type === "bun" && (
                <button key={item._id} onClick={() => {}}>
                  <div className={burgIngrStyle.item}>
                    <img
                      src={item.image}
                      className={burgIngrStyle.item__picture}
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

        <h2 className={burgIngrStyle.burgingridients__menu__title}>Соусы</h2>
        <div className={burgIngrStyle.burgingridients__menu__box}>
          {data.map(
            (item) =>
              item.type === "sauce" && (
                <button key={item._id} onClick={() => {}}>
                  <div className={burgIngrStyle.item}>
                    <img
                      src={item.image}
                      className={burgIngrStyle.item__picture}
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

        <h2 className={burgIngrStyle.burgingridients__menu__title}>Начинки</h2>
        <div className={burgIngrStyle.burgingridients__menu__box}>
          {data.map((item) => (
            <button key={item._id} onClick={() => {}}>
              <div className={burgIngrStyle.item}>
                <img src={item.image} className={burgIngrStyle.item__picture} />
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
    </section>
  );
};

export default BurgerIngredients;