import React from "react";
import orderdtlsStyle from "./OrderDetails.module.css";
import pic from "../../images/pic.png";

const OrderDetails = () => {
  return (
    <div className={orderdtlsStyle.ordrdetails}>
      <h2 className={orderdtlsStyle.ordrdetails__title}>034536</h2>
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
