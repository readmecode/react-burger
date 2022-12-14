import React from "react";
import orderdtlsStyle from "./OrderDetails.module.css";
import pic from "../../images/pic.png";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const orderIdNumber = useSelector((state) => state.orderData.orderId);
  return (
    <div className={orderdtlsStyle.ordrdetails}>
      <h2 className={orderdtlsStyle.ordrdetails__title}>{orderIdNumber}</h2>
      <p className={orderdtlsStyle.ordrdetails__subtitle}>
        идентификатор заказа
      </p>
      <img src={pic} alt="пикча" className={orderdtlsStyle.ordrdetails__pic} />
      <p className={orderdtlsStyle.ordrdetails__status}>
        Ваш заказ начали готовить
      </p>
      <p className={orderdtlsStyle.ordrdetails__notification}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
