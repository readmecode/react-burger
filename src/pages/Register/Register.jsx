import { useState } from "react";
import registerStyle from "./register.module.css";
import { Navigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "../../services/reducers/RegisterReducers/registerReducer";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

const Register = () => {
  const dispatch = useDispatch();
  const dataReg = useSelector((state) => state.registerSlice.data);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const postReqRegist = (evt) => {
    evt.preventDefault();
    dispatch(registerThunk({ password, email, name }));
  };

  if (dataReg.success) {
    return <Navigate to={`/login`} replace={true} />;
  }

  return (
    <div className={registerStyle.register}>
      <h3 className={registerStyle.register__title}>Регистрация</h3>
      <form className={registerStyle.register__form} onSubmit={postReqRegist}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          value={name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
          onChange={(evt) => setName(evt.target.value)}
          required
        />
        <EmailInput
          value={email}
          name={"email"}
          isIcon={false}
          onChange={(evt) => setEmail(evt.target.value)}
          error={false}
          required
        />
        <PasswordInput
          value={password}
          error={false}
          name={"password"}
          extraClass="mb-2"
          onChange={(evt) => setPassword(evt.target.value)}
          required
        />
        <Button htmlType="submit" type="primary" size="medium">
          Зарегестрироваться
        </Button>
      </form>
      <span className={registerStyle.register__bottom}>
        <p className={registerStyle.register__text}>Уже зарегистрированы?</p>
        <NavLink to={`/login`} className={registerStyle.register__link__sign}>
          Войти
        </NavLink>
      </span>
    </div>
  );
};

export default Register;
