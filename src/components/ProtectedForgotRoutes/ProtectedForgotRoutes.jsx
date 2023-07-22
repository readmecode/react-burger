import { Navigate } from "react-router-dom";
import { getCookie } from "../../utils/Cookies";

const ProtectedForgotRoutes = ({ children }) => {
  if (getCookie("accessToken")) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default ProtectedForgotRoutes;
