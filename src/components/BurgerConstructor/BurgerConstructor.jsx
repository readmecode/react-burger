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

const BurgerConstructor = ({ data, location, state, setState }) => {
  return (
    <section className={constructStyle.brgconstructor}>
      <div className={constructStyle.brgconstructor__box}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {data.map(
            (item) =>
              item.type === "bun" && (
                <div
                  className={
                    location === "top" || location === "bottom"
                      ? constructStyle.select
                      : null
                  }
                >
                  {location !== "top" && location !== "bottom" ? (
                    <DragIcon type="primary" style={{ display: "none" }} />
                  ) : null}
                  <ConstructorElement
                    key={item._id}
                    type={location}
                    isLocked={true}
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </div>
              )
          )}

          {data.map(
            (item) =>
              item.type === "main" && (
                <div
                  className={
                    location === "top" || location === "bottom"
                      ? constructStyle.select
                      : null
                  }
                >
                  {location !== "top" && location !== "bottom" ? (
                    <DragIcon type="primary" style={{ display: "none" }} />
                  ) : null}
                  <ConstructorElement
                    key={item._id}
                    type={location}
                    isLocked={false}
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </div>
              )
          )}

          {data.map(
            (item) =>
              item.type === "sauce" && (
                <div
                  className={
                    location === "top" || location === "bottom"
                      ? constructStyle.select
                      : null
                  }
                >
                  {location !== "top" && location !== "bottom" ? (
                    <DragIcon type="primary" style={{ display: "none" }} />
                  ) : null}
                  <ConstructorElement
                    key={item._id}
                    type={location}
                    isLocked={false}
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </div>
              )
          )}
        </div>
      </div>
      <div className={constructStyle.brgconstructor__total}>
        <div className={constructStyle.brgconstructor__total__order}>
          <p className={constructStyle.brgconstructor__amount}>610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" onClick={() => setState(false)}>
          Оформить заказ
        </Button>
      </div>
      <Modal state={state} setState={setState}>
        <OrderDetails />
      </Modal>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
      image: PropTypes.string,
      item: PropTypes.number,
    })
  ),
};

export default BurgerConstructor;
