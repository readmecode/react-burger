import React from "react";
import orderdtlsStyle from "./OrderDetails.module.css";
import pic from "../../images/pic.png";

const OrderDetails = ({pic}) => {
  return (
    <div className={orderdtlsStyle.ordrdetails}>
      <h2 className={orderdtlsStyle.ordrdetails__title}>034536</h2>
      <p className={orderdtlsStyle.ordrdetails__subtitle}>
        идентификатор заказа
      </p>
      <img src={pic} className={orderdtlsStyle.ordrdetails__img__done} />
      <p className={orderdtlsStyle.ordrdetails__upper__text}>
        Ваш заказ начали готовить
      </p>
      <p className={orderdtlsStyle.ordrdetails__lower__text}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
