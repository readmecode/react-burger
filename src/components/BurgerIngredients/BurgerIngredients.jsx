import React from "react";
import burgIngrStyle from "./BurgerIngredients.module.css";
import PropTypes from "prop-types";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";

import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = React.useState("one");
  const [state, setState] = React.useState(true);
  const [ingrData, setIngrData] = React.useState({});
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
                <button
                  key={item._id}
                  onClick={() => {
                    setState(false);
                    setIngrData(item);
                    setCurrent("one");
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




        <h2 className={burgIngrStyle.burgingridients__menu__title}>Соусы</h2>
        <div className={burgIngrStyle.burgingridients__menu__box}>
          {data.map(
            (item) =>
              item.type === "sauce" && (
                <button
                  key={item._id}
                  onClick={() => {
                    setState(false);
                    setIngrData(item);
                    setCurrent("two");
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

        <h2 className={burgIngrStyle.burgingridients__menu__title}>Начинки</h2>
        <div className={burgIngrStyle.burgingridients__menu__box}>
          {data.map((item) => (
            <button
              key={item._id}
              onClick={() => {
                setState(false);
                setIngrData(item);
                setCurrent("three");
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

      <Modal state={state} setState={setState}>
        <IngredientDetails ingrData={ingrData} />
      </Modal>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      item: PropTypes.number.isRequired,
    })
  ),
};

export default BurgerIngredients;
