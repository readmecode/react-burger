import React, { useState } from "react";
import constructStyle from "./BurgerConstructor.module.css";
import OrderDetails from "../OrderDetails/OrderDetails";

import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructor = ({ data }) => {
  return (
    <section className={constructStyle.brgconstructor}>
      <div className={constructStyle.brgconstructor__box}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {data.map(
            (item) =>
              item.type === "bun" && (
                <OrderDetails
                  key={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  locked={true}
                />
              )
          )}
          {data.map(
            (item) =>
              item.type === "main" && (
                <OrderDetails
                  key={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  locked={false}
                />
              )
          )}
          {data.map(
            (item) =>
              item.type === "sauce" && (
                <OrderDetails
                  key={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  locked={false}
                />
              )
          )}
          {data.map(
            (item) =>
              item.type === "bun" && (
                <OrderDetails
                  key={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  locked={true}
                />
              )
          )}
        </div>
      </div>
      <div className={constructStyle.brgconstructor__total}>
        <div className={constructStyle.brgconstructor__total__order}>
          <p className={constructStyle.brgconstructor__amount}>610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium">
          Нажми на меня
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
