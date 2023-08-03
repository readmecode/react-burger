import { Navigate } from "react-router-dom";
import { getCookie } from "../../utils/Cookies";

const ProtectedRoute = ({ children }) => {
  if (!getCookie("accessToken") || getCookie("accessToken") === "undefined") {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default ProtectedRoute;
