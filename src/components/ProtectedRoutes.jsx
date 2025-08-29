// ProtectedRoutes.jsx
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const user = useSelector((store) => store.user.user);
  const location = useLocation();

  if (!user && location.pathname !== "/") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
