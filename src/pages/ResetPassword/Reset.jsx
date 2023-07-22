import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PasswordInput, Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, Navigate } from "react-router-dom";
import { resetPasswordThunk } from "../../services/reducers/ResetReducers/resetReducer";
import resetStyle from "./reset.module.css";
import { createSelector } from "@reduxjs/toolkit";

const Reset = () => {
  const dispatch = useDispatch()

  const [password, setPassword] = useState("")
  const [token, setToken] = useState("")

  const resetSelector = createSelector(
    state => state.resetSlice.resultData,
    state => state.resetSlice.successTrue,
    (resultData, forgotSuccess) => ({resultData, forgotSuccess})
  )

  const {resultData, forgotSuccess} = useSelector(resetSelector)

  const submitData = (evt) => {
    evt.preventDefault()
    dispatch(resetPasswordThunk({password, token}))
  }

  if(forgotSuccess !== true) {
    return <Navigate to={`/forgot-password`} replace={true}/>
  }

  if(resultData.success) {
    return <Navigate to={`/login`}/>
  }
  return (
    <div className={resetStyle.reset}>
      <h3 className={resetStyle.reset__title}>Восстановление пароля</h3>
      <form onSubmit={submitData} className={resetStyle.reset__form}>
        <PasswordInput 
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          name={"password"} 
          extraClass="mb-2" 
          placeholder="Введите новый пароль"/>
        <Input
          value={token}
          onChange={(evt) => setToken(evt.target.value)}
          type={"text"}
          placeholder={"Введите код из письма"}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
        />
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      <span className={resetStyle.reset__bottom}>
        <p className={resetStyle.reset__text}>Вспомнили пароль?</p>
        <NavLink to={`/login`} className={resetStyle.reset__link}>
          Войти
        </NavLink>
      </span>
    </div>
  );
};

export default Reset;