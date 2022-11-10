import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import headerStyle from "./AppHeader.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  const [press, setPress] = useState("one");
  return (
    <header className={headerStyle.header}>
      <nav className={headerStyle.header__panel}>
        <button
          className={headerStyle.header__buttons}
          onClick={() => setPress("one")}
        >
          <BurgerIcon type={press === "one" ? "primary" : "secondary"} />
          Конструктор
        </button>
        <button
          className={headerStyle.header__buttons}
          onClick={() => setPress("two")}
        >
          <ListIcon type={press === "two" ? "primary" : "secondary"} />
          Лента заказов
        </button>
      </nav>
      <Logo />
      <button
        className={headerStyle.header__buttons}
        onClick={() => setPress("three")}
      >
        <ProfileIcon type={press === "three" ? "primary" : "secondary"} />
        Личный кабинет
      </button>
    </header>
  );
};

export default AppHeader;
