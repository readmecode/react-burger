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
  const [press, setPress] = useState("first-press");
  return (
    <header className={headerStyle.header}>
      <div className={headerStyle.header__panel}>
        <button
          className={headerStyle.header__buttons}
          onClick={() => setPress("first-click")}
        >
          <BurgerIcon
            type={press === "first-press" ? "primary" : "secondary"}
          />
          Конструктор
        </button>
        <button
          className={headerStyle.header__buttons}
          onClick={() => setPress("second-click")}
        >
          <ListIcon type={press === "first-press" ? "primary" : "secondary"} />
          Лента заказов
        </button>
        <Logo />
        <button className={headerStyle.header__buttons}
          onClick={() => setPress("third-click")}>
          <ProfileIcon
            type={press === "first-press" ? "primary" : "secondary"}
          />
          Личный кабинет
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
