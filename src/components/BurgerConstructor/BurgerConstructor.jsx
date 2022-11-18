import React, { useState } from "react";
import constructStyle from "./BurgerConstructor.module.css";
import OrderDetails from "../OrderDetails/OrderDetails";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";

import {
  Button,
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerItem = ({ componentItem, bunType, isLocked, bunTypePart }) => {
  console.log(componentItem);
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
          text={componentItem.name + bunTypePart}
          price={componentItem.price}
          thumbnail={componentItem.image}
        />
      </div>
    </div>
  );
};

const BurgerConstructor = ({ data }) => {
  function findBun(itemId) {
    const burgerData = data.find(function (element) {
      return element._id === itemId;
    });
    return burgerData;
  }
  const buns = data.find(function (element) {
    return element.type === "bun";
  });

  const [state, setState] = useState(true);
  return (
    <section className={`${constructStyle.brgconstructor} mt-25 ml-4`}>
      <BurgerItem
        componentItem={buns}
        bunType={"top"}
        isLocked={true}
        bunTypePart={" (верх)"}
      />
      <div className={`${constructStyle.brgconstructor__box} pr-2`}>
        {data.map((element) => {
          if (element.type !== "bun") {
            return (
              <BurgerItem
                componentItem={findBun(element._id)}
                bunType={""}
                isLocked={false}
                bunTypePart={""}
                key={element._id}
              />
            );
          }
        })}
      </div>
      <BurgerItem
        componentItem={buns}
        bunType={"bottom"}
        isLocked={true}
        bunTypePart={" (низ)"}
      />
      <div className={constructStyle.brgconstructor__total}>
        <div className={constructStyle.brgconstructor__total__order}>
          <p className={constructStyle.brgconstructor__amount}>610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => setState(false)}
        >
          Оформить заказ
        </Button>
      </div>
      {setState && (
        <Modal state={state} setState={setState}>
          <OrderDetails />
        </Modal>
      )}
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
