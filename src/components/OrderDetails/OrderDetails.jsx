import React, { useContext } from "react";
import orderdtlsStyle from "./OrderDetails.module.css";
import pic from "../../images/pic.png";
import { ConstructionContext } from "../../services/appContext";

const OrderDetails = () => {
  const { orderId } = useContext(ConstructionContext);
  return (
    <div className={orderdtlsStyle.ordrdetails}>
      <h2 className={orderdtlsStyle.ordrdetails__title}>{orderId}</h2>
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
