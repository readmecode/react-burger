import React, { useCallback, useEffect, useRef, useState } from "react";

import constructStyle from "./BurgerConstructor.module.css";
import OrderDetails from "../OrderDetails/OrderDetails";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";

import { BURGER_API } from "../../utils/burger-api.js";
import { checkRes } from "../../utils/burger-api.js";
import { ingredientType } from "../../utils/types";
import {
  getOrderTotal,
  getOrderId,
  getBun,
  addItemConstr,
  sortIngrs,
  removeItemConstr,
} from "../../services/actions/action";

import { useDrop, useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";

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
  pullIngr,
  index,
}) => {
  const dispatch = useDispatch();
  const dragRef = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "constrItem",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(element, monitor) {
      if (!dragRef.current) {
        return;
      }
      const dragIndex = element.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = dragRef.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      pullIngr(dragIndex, hoverIndex);
      element.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "constrItem",
    element: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(dragRef));

  function isAvailItem() {
    if (bunType === "") {
      return <DragIcon type="primary" />;
    }
  }

  return (
    <div
      ref={dragRef}
      handlerId={handlerId}
      className={constructStyle.brgconstructor__list}
      style={{ opacity }}
    >
      {isAvailItem()}
      <div className={constructStyle.select}>
        <ConstructorElement
          type={bunType}
          isLocked={isLocked}
          text={name + bunTypePart}
          price={price}
          thumbnail={image}
          handleClose={() => dispatch(removeItemConstr(id))}
        />
      </div>
    </div>
  );
};

const BurgerConstructor = () => {
  const [construct, setConstruct] = useState(true);
  const dispatch = useDispatch();

  const idPost = useSelector((state) => state.order.idPost);
  const sector = useSelector((state) => state.getConstr.construct);
  const price = useSelector((state) => state.getConstr.price);
  const datas = useSelector((state) => state.getIngrs.data);

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
      .then((res) => checkRes(res))
      .then((datas) => dispatch(getOrderId(datas.order.number)))
      .catch((res) => console.log(res));
  };
  useEffect(() => {
    const sourcePrice = () => {
      dispatch(getOrderTotal());
    };
    sourcePrice();
  }, [sector, dispatch]);

  const [, drop] = useDrop({
    accept: "ingrItem",
    drop: (item) => {
      item.type === "bun"
        ? dispatch(getBun({ ...item }))
        : dispatch(
            addItemConstr(...datas.filter((element) => element._id === item.id))
          );
    },
  });

  const pullIngr = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItm = sector[dragIndex];
      if (dragItm) {
        const newArr = [...sector];
        newArr.splice(dragIndex, 1);
        newArr.splice(hoverIndex, 0, dragItm);
        dispatch(sortIngrs(newArr));
      }
    },
    [sector, dispatch]
  );

  return (
    <section
      className={`${constructStyle.brgconstructor} mt-25 ml-4`}
      ref={drop}
    >
      {sector.map(
        (element, index) =>
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
              index={index}
            />
          )
      )}

      <div className={`${constructStyle.brgconstructor__box} pr-2`}>
        {sector.map(
          (element, index) =>
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
                pullIngr={pullIngr}
                index={index}
              />
            )
        )}
      </div>
      {sector.map(
        (element, index) =>
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
              index={index}
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
};

BurgerConstructor.propTypes = {
  datas: PropTypes.arrayOf(ingredientType),
};

export default BurgerConstructor;
