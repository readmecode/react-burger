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

const BurgerItem = ({
  componentItem,
  name,
  price,
  image,
  bunType,
  isLocked,
  bunTypePart,
}) => {
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
        />
      </div>
    </div>
  );
};

const BurgerConstructor = ({ data }) => {
  const [state, setState] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const buns = data.find(function (element) {
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
        {data.map((element) => {
          if (element.type !== "bun") {
            return (
              <BurgerItem
                componentItem={element._id}
                image={element.image}
                price={element.price}
                name={element.name}
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
      <Modal setState={setState} state={state}>
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
