import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUserDataThunk } from "../../services/reducers/UserDataReducer/userDataSlice";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import formStyle from "./form.module.css";

const ProfileForm = ({ userData }) => {
  useEffect(() => {
    if (userData) {
      setName(userData?.name);
      setEmail(userData?.email);
    }
  }, [userData]);

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonChange, setButtonChange] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [nameEdit, setNameEdit] = useState(true);
  const [emailEdit, setEmailEdit] = useState(true);
  const [passwordEdit, setPasswordEdit] = useState(true);

  const cancelFields = () => {
    setName("");
    setEmail("");
    setButtonChange(false);
    setNameEdit(true);
    setEmailEdit(true);
    setPasswordEdit(true);
  };

  const changeUserData = (evt) => {
    evt.preventDefault();
    dispatch(changeUserDataThunk({ name, email, password }));
  };

  const focusNameField = () => {
    setNameEdit(false);
    setButtonChange(true);
    if (nameRef.current) {
      nameRef.current.focus();
    }
  };

  const focusEmailField = () => {
    setEmailEdit(false);
    setButtonChange(true);
    if (emailRef.current) {
      emailRef.current.focus();
    }
  };

  const focusPasswordField = () => {
    setPasswordEdit(false);
    setButtonChange(true);
    if (passwordRef.current) {
      passwordRef.current.focus();
    }
  };

  return (
    <form onSubmit={changeUserData} className={formStyle.profile__form}>
      <Input
        ref={nameRef}
        onIconClick={focusNameField}
        value={name}
        type={"text"}
        placeholder={"Имя"}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="ml-1"
        icon={"EditIcon"}
        disabled={nameEdit}
        onChange={(evt) => setName(evt.target.value)}
      />
      <Input
        ref={emailRef}
        onIconClick={focusEmailField}
        value={email}
        name={"email"}
        placeholder={"Почта"}
        icon={"EditIcon"}
        disabled={emailEdit}
        onChange={(evt) => setEmail(evt.target.value)}
      />
      <Input
        ref={passwordRef}
        onIconClick={focusPasswordField}
        value={password}
        name={"password"}
        placeholder={"Пароль"}
        extraClass="mb-2"
        icon={"EditIcon"}
        disabled={passwordEdit}
        onChange={(evt) => setPassword(evt.target.value)}
      />
      <div className={formStyle.profile__button__container}>
        {buttonChange && (
          <>
            <button
              type="button"
              onClick={() => cancelFields()}
              className={formStyle.profile__button__reset}
            >
              Отмена
            </button>
            <Button type="primary" htmlType="submit" size="medium">
              Сохранить
            </Button>
          </>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
