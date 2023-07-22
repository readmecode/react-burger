import { createSelector } from "@reduxjs/toolkit";
import doneImage from "../../../assets/icons/done.png"
import Loader from "../../../components/Loader/loader";
import { RootState, useAppSelector } from "../../../services/store";
import constructStyles from "./constrModal.module.css"

const ConstructorModal = () => {
  const modalSelector = createSelector(
    (state: RootState )=> state.orderRequestSlice.order,
    (state: RootState )=> state.orderRequestSlice.success,
    (orderNumber, success) => ({orderNumber, success})
  )
  const {orderNumber, success} = useAppSelector(modalSelector)

  return ( 
  <div className={constructStyles.constr__modal}>
    {!success ? <Loader></Loader> : <h2 className={constructStyles.constr__title}>{orderNumber}</h2>}
    <p className={constructStyles.constr__subtitle}>идентификатор заказа</p>
    <img src={doneImage} alt="illustration" className={constructStyles.constr__img__done} />
    <p className={constructStyles.constructor__upper__text}>Ваш заказ начали готовить</p>
    <p className={constructStyles.constructor__lower__text}>Дождитесь готовности на орбитальной станции</p>
  </div>
  );
}
 
export default ConstructorModal;