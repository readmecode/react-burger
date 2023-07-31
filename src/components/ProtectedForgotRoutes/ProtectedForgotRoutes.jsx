import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { userAuth } from "../../services/reducers/LoginReducer/loginReducer.js";

const ProtectedForgotRoutes = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.loginSlice);

  useEffect(() => {
    dispatch(userAuth());
  }, [dispatch]);

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default ProtectedForgotRoutes;
