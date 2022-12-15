import { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useDrag } from "react-dnd";

import burgIngrStyle from "./BurgerIngredients.module.css";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import { getFlow, getIngrId, getIngrData } from "../../services/actions/action";

import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredients = ({content}) => {
  const [current, setCurrent] = useState("one");
  const [ingr, setIngr] = useState(true);

  const data = useSelector((state) => state.getIngrs.data);

  const sectionBuns = useRef();
  const sectionSauces = useRef();
  const sectionMain = useRef();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFlow());
  }, [dispatch]);

  const selectBuns = useSelector((state) => state.getConstr.constrBun);
  const selectedItem = useSelector((state) => state.getConstr.construct).filter(
    (element) => content._id === element._id
  );

  const [{ isDragging }, dragRef] = useDrag({
    type: "constrItem",
    content: content,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
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
          {data.data.map(
            (content) =>
              content.type === "bun" && (
                <button
                  key={content._id}
                  onClick={() => {
                    setIngr(false);
                    setCurrent("one");
                    dispatch(getIngrData(content));
                    dispatch(getIngrId(content._id));
                  }}
                >
                  <div
                    className={burgIngrStyle.item}
                    ref={dragRef}
                    style={{ opacity }}
                  >
                    <img
                      src={content.image}
                      alt={content.name}
                      className={burgIngrStyle.item__picture}
                    />
                    

                    <div className={burgIngrStyle.item__value}>
                      <p className={burgIngrStyle.value}>{content.price}</p>
                      <CurrencyIcon
                        className={burgIngrStyle.item__logo}
                        type="primary"
                      />
                    </div>
                    <p className={burgIngrStyle.item__description}>
                      {content.name}
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
          {data.data.map(
            (content) =>
              content.type === "sauce" && (
                <button
                  key={content._id}
                  onClick={() => {
                    setIngr(false);
                    setCurrent("two");
                    dispatch(getIngrData(content));
                    dispatch(getIngrId(content._id));
                  }}
                >
                  <div
                    className={burgIngrStyle.item}
                    ref={dragRef}
                    style={{ opacity }}
                  >
                    <img
                      src={content.image}
                      alt={content.name}
                      className={burgIngrStyle.item__picture}
                    />
                   
                    <div className={burgIngrStyle.item__value}>
                      <p className={burgIngrStyle.value}>{content.price}</p>
                      <CurrencyIcon
                        className={burgIngrStyle.item__logo}
                        type="primary"
                      />
                    </div>
                    <p className={burgIngrStyle.item__description}>
                      {content.name}
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
          {data.data.map(
            (content) =>
              content.type === "main" && (
                <button
                  key={content._id}
                  onClick={() => {
                    setIngr(false);
                    setCurrent("three");
                    dispatch(getIngrData(content));
                    dispatch(getIngrId(content._id));
                  }}
                >
                  <div
                    className={burgIngrStyle.item}
                    ref={dragRef}
                    style={{ opacity }}
                  >
                    <img
                      src={content.image}
                      alt={content.name}
                      className={burgIngrStyle.item__picture}
                    />
                   
                    <div className={burgIngrStyle.item__value}>
                      <p className={burgIngrStyle.value}>{content.price}</p>
                      <CurrencyIcon
                        className={burgIngrStyle.item__logo}
                        type="primary"
                      />
                    </div>
                    <p className={burgIngrStyle.item__description}>
                      {content.name}
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
