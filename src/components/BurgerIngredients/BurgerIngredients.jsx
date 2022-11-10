import React from "react";
import burgIngrStyle from "./BurgerIngredients.module.css";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredients = ({ data, state, setState }) => {
  const [current, setCurrent] = React.useState("one");
  return (
    <section className={burgIngrStyle.burgingridients}>
      <h1 className={burgIngrStyle.burgingridients__title}>Соберите бургер</h1>

      <div style={{ display: "flex" }}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          One
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Two
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Three
        </Tab>
      </div>

      <div className={burgIngrStyle.burgingridients__menu}>
        <h2 className={burgIngrStyle.burgingridients__menu__title}>Булки</h2>
        <div className={burgIngrStyle.burgingridients__menu__part}>
          {data.map(
            (part) =>
              part.type === "bun" && (
                <button
                  key={part._id}
                  onClick={() => {
                    setState(false);
                    setCurrent("two");
                  }}
                >
                  <IngredientDetails
                    text={part.name}
                    price={part.price}
                    image={part.image}
                  />
                </button>
              )
          )}
        </div>

        <h2 className={burgIngrStyle.burgingridients__menu__title}>Соусы</h2>
        <div className={burgIngrStyle.burgingridients__menu__part}>
          {data.map(
            (part) =>
              part.type === "sauce" && (
                <button
                  key={part._id}
                  onClick={() => {
                    setState(false);
                  }}
                >
                  <IngredientDetails
                    text={part.name}
                    price={part.price}
                    image={part.image}
                  />
                </button>
              )
          )}
        </div>

        <h2 className={burgIngrStyle.burgingridients__menu__title}>Начинки</h2>
        <div className={burgIngrStyle.burgingridients__menu__part}>
          {data.map((part) => (
            <button
              key={part._id}
              onClick={() => {
                setState(false);
              }}
            >
              <IngredientDetails
                text={part.name}
                price={part.price}
                image={part.image}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;
