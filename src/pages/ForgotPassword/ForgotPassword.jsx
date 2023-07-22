import React, { useState } from "react";
import forgotStyle from "./forgot.module.css";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordThunk } from "../../services/reducers/ResetReducers/resetReducer";
import { Navigate } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const forgotSuccess = useSelector((state) => state.resetSlice.successTrue);

  const submitEmail = (evt) => {
    evt.preventDefault();
    dispatch(forgotPasswordThunk({ email }));
  };
  if (forgotSuccess === true) {
    return <Navigate to={`/reset-password`} replace={true} />;
  }

  return (
    <div className={forgotStyle.forgot}>
      <h3 className={forgotStyle.forgot__title}>Восстановление пароля</h3>
      <form className={forgotStyle.forgot__form} onSubmit={submitEmail}>
        <EmailInput
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          name={"email"}
          isIcon={false}
          placeholder="Укажите e-mail"
        />
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      <span className={forgotStyle.forgot__bottom}>
        <p className={forgotStyle.forgot__text}>Вспомнили пароль?</p>
        <NavLink to={`/login`} className={forgotStyle.forgot__link}>
          Войти
        </NavLink>
      </span>
    </div>
  );
};

export default ForgotPassword;
