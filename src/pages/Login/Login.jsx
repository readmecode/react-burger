import { FormEvent, useState, FC } from "react";
import loginStyle from "./login.module.css";
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { loginThunk } from "../../services/reducers/LoginReducer/loginReducer";
import { Navigate } from "react-router-dom";
import { setCookie } from "../../utils/Cookies";
import { createSelector } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector, RootState } from "../../services/store";

const Login: FC = () => {
  const dispatch = useAppDispatch()

  const loginSelector = createSelector(
    (state: RootState)=> state.loginSlice.data,
    (state: RootState)=> state.loginSlice.dataUser,
    (dataLogin, authUser) => ({dataLogin, authUser})
  )

  const {dataLogin, authUser} = useAppSelector(loginSelector)
  console.log(dataLogin, authUser)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const postReqLogin = (evt: FormEvent) => {
    evt.preventDefault()
    dispatch(loginThunk({email, password}))
  }

  if(dataLogin?.success) {
    setCookie("accessToken", dataLogin?.accessToken)
    setCookie("refreshToken", dataLogin?.refreshToken)
  }

  if(authUser?.success) {
    return <Navigate to={`/`} replace={true}/>
  }

  return (
    <div className={loginStyle.login}>
      <h3 className={loginStyle.login__title}>Войти</h3>
      <form onSubmit={postReqLogin} className={loginStyle.login__form}>
        <EmailInput 
          value={email}
          name={"email"} 
          isIcon={false} 
          onChange={(evt) => setEmail(evt.target.value)}/>
        <PasswordInput 
          value={password}
          name={"password"} 
          extraClass="mb-2" 
          onChange={(evt) => setPassword(evt.target.value)}
        />
        {
          dataLogin?.success === false ? <p className={loginStyle.login__error}> Пароль или почта неверно введены.</p> : null
        }
        <Button type="primary" htmlType="submit" size="medium">
          Войти
        </Button>
      </form>
      <span className={loginStyle.login__bottom}>
        <p className={loginStyle.login__text}>Вы — новый пользователь?</p>
        <NavLink to={`/register`} className={loginStyle.login__link}>
          Зарегистрироваться
        </NavLink>
      </span>
      <span className={loginStyle.login__bottom}>
        <p className={loginStyle.login__text}>Забыли пароль?</p>
        <NavLink to={`/forgot-password`} className={loginStyle.login__link}>
          Восстановить пароль
        </NavLink>
      </span>
    </div>
  );
};

export default Login;
