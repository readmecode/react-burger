import React, { useContext, useEffect } from "react";
import { ConstructionContext } from "../../services/appContext";

import constructStyle from "./BurgerConstructor.module.css";
import OrderDetails from "../OrderDetails/OrderDetails";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";

import { BURGER_API } from "../../utils/burger-api.js";

import {
  Button,
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerItem = ({
  componentItem,
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
          text={name || componentItem.name + bunTypePart}
          price={price || componentItem.price}
          thumbnail={image || componentItem.image}
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
      .then((res) => res.json())
      .then((data) => setOrderId(data.order.number));
  };

  useEffect(() => {
    const sourcePrice = () => {
      const total = item.reduce((prev, curr) => prev + curr.price, 0);
      setPrice(total);
    };
    sourcePrice();
  }, [item, setPrice]);

  const buns = item.find(function (element) {
    return element.type === "bun";
  });

  return (
    <section className={`${constructStyle.brgconstructor} mt-25 ml-4`}>
      <BurgerItem
        componentItem={buns}
        bunType={"top"}
        isLocked={true}
        bunTypePart={" (верх)"}
      />
      <div className={`${constructStyle.brgconstructor__box} pr-2`}>
        {item.map(
          (element) =>
            element.type !== "bun" && (
              <BurgerItem
                componentItem={element._id}
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
      <BurgerItem
        componentItem={buns}
        bunType={"bottom"}
        isLocked={true}
        bunTypePart={" (низ)"}
      />
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
  componentItem: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      _id: PropTypes.string,
    })
  ),
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ),
};

export default BurgerConstructor;
