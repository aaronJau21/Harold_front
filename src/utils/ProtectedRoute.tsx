import { Navigate, Outlet } from "react-router-dom";
import { protectedRoute } from "../interfaces/interfaces";



const ProtectedRoute = ({
  canActivate,
  redirectPath = "/",
}: protectedRoute) => {
  if (!canActivate) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
