import { Navigate, Outlet } from "react-router-dom";

interface protectedRoute {
  canActivate: unknown;
  redirectPath?: string;
}

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
