import { useEffect, useCallback } from "react";
import constructorStyles from "./constructor.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import Order from "../OrderDetails/Order";
import { Link, useLocation } from "react-router-dom";

import {
  getConstructorElements,
  getConstructorBuns,
  getTotalPrice,
  sortingConstructorElements,
} from "../../../services/reducers/HomeReducers/burgerConstructor";

import {
  orderThunk,
  getIdPosts,
  getIdPostsBun,
  totalIdOrder,
} from "../../../services/reducers/HomeReducers/orderThunk";
import { createSelector } from "@reduxjs/toolkit";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const constructorSelector = createSelector(
    (state) => state.burgerConstructor.price,
    (state) => state.loginSlice.dataUser,
    (price, authUser) => ({ price, authUser })
  );

  const orderSelector = createSelector(
    (state) => state.orderRequestSlice.idPostArr,
    (state) => state.orderRequestSlice.bunArr,
    (state) => state.orderRequestSlice.totalArrOrder,
    (idPost, idBun, totalIdReq) => ({ idPost, idBun, totalIdReq })
  );

  const loginSelector = createSelector(
    (state) => state.getIngredients.data.data,
    (data) => ({ data })
  );

  const constructSelector = createSelector(
    (state) => state.burgerConstructor.constructorArr,
    (constructorArr) => ({ constructorArr })
  );

  const { price, authUser } = useSelector(constructorSelector);
  const { idPost, idBun, totalIdReq } = useSelector(orderSelector);
  const { constructorArr } = useSelector(constructSelector);
  const { data } = useSelector(loginSelector);

  let brgArr = useSelector((state) => state.burgerConstructor.bunArr);

  const [, drop] = useDrop({
    accept: "ingredElement",
    drop: (item) => {
      if (item.type === "bun") {
        dispatch(getConstructorBuns({ ...item }));
        dispatch(getIdPostsBun(item._id));
      } else {
        dispatch(
          getConstructorElements(...data.filter((el) => el._id === item._id))
        );
      }
    },
  });

  useEffect(() => {
    dispatch(getIdPosts(constructorArr));
    dispatch(getTotalPrice());
  }, [constructorArr, dispatch]);

  const totalPrice = () => {
    let totalPrice = 0;
    totalPrice = totalPrice + price;
    if (isNaN(brgArr.price)) {
      brgArr = JSON.parse(JSON.stringify(brgArr));
      brgArr.price = 0;
    }
    const bunsPrice = brgArr.price * 2;
    totalPrice = totalPrice + bunsPrice;
    return totalPrice;
  };

  const moveIngredient = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = constructorArr[dragIndex];
      if (dragItem) {
        const newArray = [...constructorArr];
        newArray.splice(dragIndex, 1);
        newArray.splice(hoverIndex, 0, dragItem);
        dispatch(sortingConstructorElements(newArray));
      }
    },
    [constructorArr, dispatch]
  );

  useEffect(() => {
    dispatch(totalIdOrder(idBun.concat(idPost)));
  }, [dispatch, idBun, idPost]);

  return (
    <section className={constructorStyles.constructor}>
      <div className={constructorStyles.constructor__container} ref={drop}>
        <div className={constructorStyles.constructor__block__elements}>
          {brgArr.length !== 0 && (
            <Order
              position={"top"}
              locked={true}
              name={brgArr.name + " (вверх)"}
              image={brgArr.image}
              price={brgArr.price}
              key={brgArr.id}
              _id={brgArr._id}
            />
          )}
          {constructorArr &&
            constructorArr.map(
              (detail, index) =>
                detail.type !== "bun" && (
                  <Order
                    locked={false}
                    name={detail.name}
                    price={detail.price}
                    image={detail.image}
                    key={detail.id}
                    index={index}
                    idEl={detail.id}
                    _id={detail._id}
                    moveIngredient={moveIngredient}
                  />
                )
            )}
          {brgArr.length !== 0 && (
            <Order
              position={"bottom"}
              locked={true}
              name={brgArr.name + " (низ)"}
              image={brgArr.image}
              price={brgArr.price}
              key={brgArr.id}
              _id={brgArr._id}
            />
          )}
        </div>
      </div>
      <div className={constructorStyles.contstructor__block__bottom}>
        <div className={constructorStyles.contstructor__number__block}>
          <p className={constructorStyles.constructor__number}>
            {totalPrice()}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        {authUser && authUser.success ? (
          <Link
            to={`/orders`}
            state={{ background: location }}
            onClick={() => dispatch(orderThunk(totalIdReq))}
          >
            <Button type="primary" size="medium" htmlType="button">
              Нажми на меня
            </Button>
          </Link>
        ) : (
          <Button type="primary" size="medium" disabled htmlType="button">
            Нажми на меня
          </Button>
        )}
      </div>
    </section>
  );
};

export default BurgerConstructor;
