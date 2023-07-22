import { useRef, FC } from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop, useDrag } from "react-dnd";
import orderStyles from "./order.module.css"
import { removeConstructorElement } from "../../../services/reducers/HomeReducers/burgerConstructor";
import { removeIdPost } from "../../../services/reducers/HomeReducers/orderThunk";
import { IOrder } from "../../../utils/interfaces/interface";
import { useAppDispatch } from "../../../services/store";

const Order: FC<IOrder> = ({position, locked, name, price, image, index, idEl, moveIngredient, _id}) => {
  const dispatch = useAppDispatch()

  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop({
    accept: "constructorEL",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: any, monitor) {
      console.log(item)
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex! && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex! && hoverClientY > hoverMiddleY) {
        return
      }
      moveIngredient!(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: "constructorEL",
    item: () => {
      return { idEl, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

  return ( 
    <div ref={ref} data-handler-id={handlerId} className={position !== "top" && position !== "bottom" ? orderStyles.order : orderStyles.order__middle} style={{opacity}}>
      {position !== "top" && position !== "bottom" ? <DragIcon type="primary"/> : null}
      <ConstructorElement
      type={position === undefined ? undefined : position === "top" ? "top" : "bottom"}
      isLocked={locked}
      text={name}
      price={price}
      thumbnail={image}
      handleClose={() => {dispatch(removeConstructorElement(idEl)); dispatch(removeIdPost(_id))}}
    />
  </div>
  );
}
 

export default Order;