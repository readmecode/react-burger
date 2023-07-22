import headerStyles from "./appHeader.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

const AppHeader = ({ authUser }) => {
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.header__buttons}>
        <NavLink to="/" className="header__link">
          {({ isActive }) => (
            <div className={headerStyles.header__nav__container}>
              <BurgerIcon
                type={isActive ? "primary" : "secondary"}
                className={headerStyles.header__burger__icon}
              />
              Конструктор
            </div>
          )}
        </NavLink>
        <NavLink to="/feed" className="header__link">
          {({ isActive }) => (
            <div className={headerStyles.header__nav__container}>
              <ListIcon
                type={isActive ? "primary" : "secondary"}
                className={headerStyles.header__burger__icon}
              />
              Лента заказов
            </div>
          )}
        </NavLink>
      </div>
      <Logo />

      <NavLink to={authUser ? "/profile" : "/login"} className="header__link">
        {({ isActive }) => (
          <div className={headerStyles.header__nav__container}>
            <ProfileIcon
              type={isActive ? "primary" : "secondary"}
              className={headerStyles.header__burger__icon}
            />
            Личный кабинет
          </div>
        )}
      </NavLink>
    </header>
  );
};

export default AppHeader;
