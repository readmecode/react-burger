import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import appStyles from "./app.module.css";

import AppHeader from "../AppHeader/AppHeader";
import Home from "../../pages/Home/Home";
import Register from "../../pages/Register/Register";
import Login from "../../pages/Login/Login";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import Profile from "../../pages/Profile/Profile";
import Reset from "../../pages/ResetPassword/Reset";
import IngredientDetails from "../../pages/Home/IngredientDetails/IngredientDetails";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Modal from "../Modal/Modal";
import FeedPage from "../../pages/Feed/FeedPage.jsx";
import ModalFeed from "../../pages/Feed/ModalFeed/ModalFeed";
import Feed from "../../pages/FeedPage/Feed";
import ProfileOrders from "../../pages/Profile/ProfileOrders/ProfileOrders";
import ProfileForm from "../ProfileForm/ProfileForm";
import ProtectedForgotRoutes from "../ProtectedForgotRoutes/ProtectedForgotRoutes";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";

import IngredientPage from "../../pages/IngredientPage/IngredientPage";
import { useNavigate } from "react-router-dom";

import { getDataIngredients } from "../../services/reducers/HomeReducers/getIngredients";
import ConstructorModal from "../../pages/Home/ConstructorModal/ConstructorModal";
import { createSelector } from "@reduxjs/toolkit";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const appSelector = createSelector(
    (state) => state.loginSlice.data,
    (state) => state.loginSlice.dataUser,
    (state) => state.userDataSlice.data,
    (dataLogin, authUser, changeData) => ({ dataLogin, authUser, changeData })
  );

  const { dataLogin, authUser, changeData } = useSelector(appSelector);
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getDataIngredients());
  }, [dispatch]);

  return (
    <div className={appStyles.App}>
      <AppHeader authUser={authUser} />
      <main className={appStyles.main}>
        <Routes location={background || location}>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/register"
            element={
              <ProtectedForgotRoutes>
                <Register />
              </ProtectedForgotRoutes>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/forgot-password"
            element={
              <ProtectedForgotRoutes>
                <ForgotPassword />
              </ProtectedForgotRoutes>
            }
          />
          <Route path="/reset-password" element={<Reset />} />
          <Route path="/ingredients/:id" element={<IngredientPage />} />
          <Route exact path="/feed" element={<FeedPage />} />
          <Route exact path="/feed/:id" element={<Feed />} />
          <Route
            exact
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile>
                  <ProfileForm userData={authUser.user} />
                </Profile>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/profile/orders"
            element={
              <ProtectedRoute>
                <Profile>
                  <ProfileOrders />
                </Profile>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/profile/orders/:id"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>

        {background && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal
                  handleClose={() => {
                    navigate(-1);
                  }}
                >
                  <IngredientDetails />
                </Modal>
              }
            />

            <Route
              path="/orders"
              element={
                <Modal
                  handleClose={() => {
                    navigate(-1);
                  }}
                >
                  <ConstructorModal />
                </Modal>
              }
            />

            <Route
              path="/feed/:id"
              element={
                <Modal
                  handleClose={() => {
                    navigate(-1);
                  }}
                >
                  <ModalFeed />
                </Modal>
              }
            />

            <Route
              exact
              path="/profile/orders/:id"
              element={
                <Modal
                  handleClose={() => {
                    navigate(-1);
                  }}
                >
                  <ModalFeed />
                </Modal>
              }
            />
          </Routes>
        )}
      </main>
    </div>
  );
};

export default App;
