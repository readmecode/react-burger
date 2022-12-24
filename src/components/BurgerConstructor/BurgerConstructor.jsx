import { useCallback, useEffect, useRef, useState, useMemo } from "react";

import constructStyle from "./BurgerConstructor.module.css";
import OrderDetails from "../OrderDetails/OrderDetails";

import Modal from "../Modal/Modal";
import { sendData } from "../../services/actions/action";
import {
  getOrderTotal,
  getBun,
  addItemConstr,
  sortIngrs,
  removeItemConstr,
  getIngrId,
} from "../../services/actions/action";

import { useDrop, useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const BurgerItem = ({
  name,
  price,
  image,
  position,
  locked,
  idItm,
  pullIngr,
  index,
}) => {
  const dispatch = useDispatch();

  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "constrItem",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
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
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "constrItem",
    item: () => {
      return { idItm, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  function isAvailItem() {
    if (position === "") {
      return <DragIcon type="primary" />;
    }
  }

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className={constructStyle.brgconstructor__list}
      style={{ opacity }}
    >
      {isAvailItem()}
      <div className={constructStyle.select}>
        <ConstructorElement
          type={position}
          isLocked={locked}
          text={name}
          price={price}
          thumbnail={image}
          handleClose={() => dispatch(removeItemConstr(idItm))}
        />
      </div>
    </div>
  );
};

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const idPost = useSelector((state) => state.order.idPost);
  const sector = useSelector((state) => state.getConstr.construct);
  const price = useSelector((state) => state.getConstr.price);
  const data = useSelector((state) => state.getIngredData.data);
  const bunItem = useSelector((state) => state.getConstr.constrBun);

  useEffect(() => {
    const sourcePrice = () => {
      dispatch(getOrderTotal());
    };
    sourcePrice();
  }, [sector, dispatch]);

  const [, drop] = useDrop({
    accept: "ingrElmt",
    drop: (item) => {
      item.type === "bun" ? dispatch(getBun({ ...item })) : addSection(item);
      dispatch(getIngrId(item._id));
    },
  });

  const addSection = (item) => {
    dispatch(addItemConstr(...data.filter((itm) => itm._id === item._id)));
  };

  const totalOrder = useMemo(() => {
    let totalOrder = 0;
    totalOrder = totalOrder + price;
    if (isNaN(bunItem.price)) {
      bunItem.price = 0;
    }
    const bunOrder = bunItem.price;
    return (totalOrder = totalOrder + bunOrder);
  }, [bunItem, price]);
  const [construct, setConstruct] = useState(true);

  const pullIngr = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = sector[dragIndex];
      if (dragItem) {
        const newArray = [...sector];
        newArray.splice(dragIndex, 1);
        newArray.splice(hoverIndex, 0, dragItem);
        dispatch(sortIngrs(newArray));
      }
    },
    [sector, dispatch]
  );

  return (
    <section
      className={`${constructStyle.brgconstructor} mt-25 ml-4`}
      ref={drop}
    >
      {bunItem.length !== 0 && (
        <BurgerItem
          position={"top"}
          locked={true}
          name={bunItem.name + " (верх)"}
          image={bunItem.image}
          price={bunItem.price / 2}
          key={bunItem.id}
        />
      )}

      <div className={`${constructStyle.brgconstructor__box} pr-2`}>
        {sector.map(
          (specs, index) =>
            specs.type !== "bun" && (
              <BurgerItem
                locked={false}
                name={specs.name}
                image={specs.image}
                price={specs.price}
                key={specs.id}
                index={index}
                idItm={specs.id}
                pullIngr={pullIngr}
                position={""}
              />
            )
        )}
      </div>
      {bunItem.length !== 0 && (
        <BurgerItem
          position={"bottom"}
          locked={true}
          name={bunItem.name + " (низ)"}
          image={bunItem.image}
          price={bunItem.price / 2}
          key={bunItem.id}
        />
      )}
      <div className={constructStyle.brgconstructor__total}>
        <div className={constructStyle.brgconstructor__total__order}>
          <p className={constructStyle.brgconstructor__amount}>{totalOrder}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => {
            setConstruct(false);
            dispatch(sendData(idPost));
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

export default BurgerConstructor;
