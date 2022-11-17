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
        <a
          href="#"
          className={headerStyle.header__buttons}
          onClick={() => setPress("one")}
        >
          <BurgerIcon type={press === "one" ? "primary" : "secondary"} />
          <p
            className={
              press === "one"
                ? "text text_type_main-default"
                : "text text_type_main-default text_color_inactive"
            }
          >
            Конструктор{" "}
          </p>
        </a>
        <a
          href="#"
          className={headerStyle.header__buttons}
          onClick={() => setPress("two")}
        >
          <ListIcon type={press === "two" ? "primary" : "secondary"} />
          <p
            className={
              press === "two"
                ? "text text_type_main-default"
                : "text text_type_main-default text_color_inactive"
            }
          >
            Лента заказов{" "}
          </p>
        </a>
      </nav>
      <div className={headerStyle.logotype}>
        <Logo />
      </div>

      <a
        href="#"
        className={headerStyle.header__buttons}
        onClick={() => setPress("three")}
      >
        <ProfileIcon type={press === "three" ? "primary" : "secondary"} />
        <p
          className={
            press === "three"
              ? "text text_type_main-default"
              : "text text_type_main-default text_color_inactive"
          }
        >
          Личный кабинет{" "}
        </p>
      </a>
    </header>
  );
};

export default AppHeader;
