import { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";

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

const BurgerIngredient = ({ image, price, item, name }) => {
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

  const opacity = isDragging ? 0.3 : 1;

  const checkCount = useMemo(() => {
    if (item.type === "bun") {
      return selectBuns && selectBuns._id === item._id ? 2 : 0;
    }
    return selectedItem.length;
  });

  return (
    <div className={burgIngrStyle.item} ref={dragRef} style={{ opacity }}>
      <img src={image} alt={name} className={burgIngrStyle.item__picture} />
      {checkCount === 0 ? null : (
        <Counter
          className={burgIngrStyle.counter}
          count={checkCount}
          size="default"
        />
      )}
      <div className={burgIngrStyle.item__value}>
        <p className={burgIngrStyle.value}>{price}</p>
        <CurrencyIcon className={burgIngrStyle.item__logo} type="primary" />
      </div>
      <p className={burgIngrStyle.item__description}>{name}</p>
    </div>
  );
};

const BurgerIngredients = () => {
  const data = useSelector((state) => state.getIngredData.data);
  const [current, setCurrent] = useState("one");
  const [ingr, setIngr] = useState(true);

  const [sectionBuns, sectionBunsView] = useInView({ threshold: 0 });
  const [sectionSauces, sectionSaucesView] = useInView({ threshold: 0 });
  const [sectionMain, sectionMainView] = useInView({ threshold: 0 });

  useEffect(() => {
    if (sectionBunsView) {
      setCurrent("one");
    } else if (sectionSaucesView) {
      setCurrent("two");
    } else if (sectionMainView) {
      setCurrent("three");
    }
  }, [sectionBunsView, sectionSaucesView, sectionMainView]);

  const scrollToBlock = (elmt) => {
    setCurrent(elmt);
    document.querySelector(`#${elmt}`).scrollIntoView({
      behavior: "smooth",
    });
    console.log(elmt);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFlow());
  }, [dispatch]);

  return (
    <section className={burgIngrStyle.burgingridients}>
      <h1 className={burgIngrStyle.burgingridients__title}>Соберите бургер</h1>

      <div className={burgIngrStyle.burgingridients__titlemenu}>
        <Tab
          value="one"
          active={current === "one"}
          onClick={() => scrollToBlock("one")}
        >
          Булки
        </Tab>
        <Tab
          value="two"
          active={current === "two"}
          onClick={() => scrollToBlock("two")}
        >
          Соусы
        </Tab>
        <Tab
          value="three"
          active={current === "three"}
          onClick={() => scrollToBlock("three")}
        >
          Начинки
        </Tab>
      </div>

      <div className={burgIngrStyle.burgingridients__menu}>
        <h2
          ref={sectionBuns}
          id="one"
          className={burgIngrStyle.burgingridients__menu__title}
        >
          Булки
        </h2>
        <div className={burgIngrStyle.burgingridients__menu__box}>
          {data.map(
            (content) =>
              content.type === "bun" && (
                <button
                  key={content._id}
                  onClick={() => {
                    setIngr(false);
                    setCurrent("one");
                    dispatch(getIngrData(content));
                  }}
                  onMouseDown={() => dispatch(getIngrId(content._id))}
                >
                  <BurgerIngredient
                    name={content.name}
                    price={content.price}
                    image={content.image}
                    item={content}
                  />
                </button>
              )
          )}
        </div>

        <h2
          ref={sectionSauces}
          id="two"
          className={burgIngrStyle.burgingridients__menu__title}
        >
          Соусы
        </h2>
        <div className={burgIngrStyle.burgingridients__menu__box}>
          {data.map(
            (content) =>
              content.type === "sauce" && (
                <button
                  key={content._id}
                  onClick={() => {
                    setIngr(false);
                    setCurrent("two");
                    dispatch(getIngrData(content));
                  }}
                  onMouseDown={() => dispatch(getIngrId(content._id))}
                >
                  <BurgerIngredient
                    name={content.name}
                    price={content.price}
                    image={content.image}
                    item={content}
                  />
                </button>
              )
          )}
        </div>

        <h2
          ref={sectionMain}
          id="three"
          className={burgIngrStyle.burgingridients__menu__title}
        >
          Начинки
        </h2>
        <div className={burgIngrStyle.burgingridients__menu__box}>
          {data.map(
            (content) =>
              content.type === "main" && (
                <button
                  key={content._id}
                  onClick={() => {
                    setIngr(false);
                    setCurrent("three");
                    dispatch(getIngrData(content));
                  }}
                  onMouseDown={() => dispatch(getIngrId(content._id))}
                >
                  <BurgerIngredient
                    name={content.name}
                    price={content.price}
                    image={content.image}
                    item={content}
                  />
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
