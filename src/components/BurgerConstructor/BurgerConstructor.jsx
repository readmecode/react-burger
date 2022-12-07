import React, { useContext, useEffect } from "react";
import { ConstructionContext } from "../../services/appContext";

import constructStyle from "./BurgerConstructor.module.css";
import OrderDetails from "../OrderDetails/OrderDetails";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";

import { BURGER_API } from "../../utils/burger-api.js";
import { checkRes } from "../../utils/burger-api.js";
import { ingredientType } from "../../utils/types";

import {
  Button,
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerItem = ({
  name,
  price,
  image,
  bunType,
  isLocked,
  bunTypePart,
  id,
}) => {
  const { removeItemConstruction } = useContext(ConstructionContext);

  function isAvailItem() {
    if (bunType === "") {
      return <DragIcon type="primary" />;
    }
  }

  return (
    <div className={constructStyle.brgconstructor__list}>
      {isAvailItem()}
      <div className={constructStyle.select}>
        <ConstructorElement
          type={bunType}
          isLocked={isLocked}
          text={name + bunTypePart}
          price={price}
          thumbnail={image}
          handleClose={() => removeItemConstruction(id)}
        />
      </div>
    </div>
  );
};

const BurgerConstructor = () => {
  const { construct, setConstruct, setOrderId, item, price, setPrice, idPost } =
    useContext(ConstructionContext);
  console.log();

  const sendData = (ingrElements) => {
    return fetch(`${BURGER_API}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingrElements,
      }),
    })
      .then(checkRes)
      .then((data) => setOrderId(data.order.number))
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  };

  useEffect(() => {
    const sourcePrice = () => {
      const total = item.reduce((prev, curr) => prev + curr.price, 0);
      setPrice(total);
    };
    sourcePrice();
  }, [item, setPrice]);

  return (
    <section className={`${constructStyle.brgconstructor} mt-25 ml-4`}>
      {item.map(
        (element) =>
          element.type === "bun" && (
            <BurgerItem
              image={element.image}
              price={element.price - (1 / 2) * element.price}
              name={element.name}
              bunType={"top"}
              isLocked={true}
              bunTypePart={" (верх)"}
              key={element._id}
              id={element._id}
            />
          )
      )}

      <div className={`${constructStyle.brgconstructor__box} pr-2`}>
        {item.map(
          (element) =>
            element.type !== "bun" && (
              <BurgerItem
                image={element.image}
                price={element.price}
                name={element.name}
                bunType={""}
                isLocked={false}
                bunTypePart={""}
                key={element._id}
                id={element._id}
              />
            )
        )}
      </div>
      {item.map(
        (element) =>
          element.type === "bun" && (
            <BurgerItem
              image={element.image}
              price={element.price - (1 / 2) * element.price}
              name={element.name}
              bunType={"bottom"}
              isLocked={true}
              bunTypePart={" (низ)"}
              key={element._id}
              id={element._id}
            />
          )
      )}
      <div className={constructStyle.brgconstructor__total}>
        <div className={constructStyle.brgconstructor__total__order}>
          <p className={constructStyle.brgconstructor__amount}>{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => {
            setConstruct(false);
            sendData(idPost);
          }}
        >
          Оформить заказ
        </Button>
      </div>
      <Modal setState={setConstruct} state={construct}>
        <OrderDetails />
      </Modal>
    </section>
  );
};

BurgerItem.propTypes = {
  bunType: PropTypes.string,
  isLocked: PropTypes.bool,
  bunTypePart: PropTypes.string,
  componentItem: PropTypes.arrayOf(ingredientType),
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientType),
};

export default BurgerConstructor;
