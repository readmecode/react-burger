
import profileStyle from "./profile.module.css";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../services/store";
import { logoutThunk } from "../../services/reducers/logoutReducer/logoutReducer";
import { getCookie, deleteCookie } from "../../utils/Cookies";
import { logout } from "../../services/reducers/LoginReducer/loginReducer";

import { wsApiUrl } from "../../utils/Api";
import { connStart, connClosed } from "../../services/reducers/feedReducer/feedReducer";
import { useEffect, FC } from "react";
import { IProfile } from "../../utils/interfaces/interface";

const Profile: FC<IProfile> = ({children}) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      connStart(`${wsApiUrl}?token=${getCookie("accessToken")?.split(" ")[1]}`))
      return () => {
        dispatch(connClosed())
      }
  }, [dispatch])

  const logoutFromProfile = () => {
    dispatch(logout())
    dispatch(logoutThunk())
    deleteCookie("accessToken")
    deleteCookie("refreshToken")
  }

  return (
    <div className={profileStyle.profile}>
      <div className={profileStyle.profile__container}>
        <nav className={profileStyle.profile__nav}>
          <NavLink 
            className={({isActive}) => isActive ? profileStyle.profile__link : profileStyle.profile__link_disabled} 
            to="/profile"
            end>Профиль
          </NavLink>
          <NavLink 
            className={({isActive}) => isActive ? profileStyle.profile__link : profileStyle.profile__link_disabled} 
            to="/profile/orders"
            >История заказов
          </NavLink>
          <NavLink 
            onClick={() => logoutFromProfile()} 
            className={({isActive}) => isActive ? profileStyle.profile__link : profileStyle.profile__link_disabled} 
            to="/login">Выход
          </NavLink>
          <p className={profileStyle.profile__text__info}>В этом разделе вы можете изменить свои персональные данные</p>
        </nav>
        {children}
      </div>
    </div>
  );
};

export default Profile;
